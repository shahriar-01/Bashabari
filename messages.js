'use strict';

(function () {
  let activeConnectionId = null;
  let lastMessageId = 0;
  let pollingInterval = null;
  let conversations = [];
  let pollCounter = 0;
  let activeFilter = 'all';

  const $ = id => document.getElementById(id);
  const currentUser = () => window.CURRENT_USER || safeJSON(localStorage.getItem('bashabari_user')) || null;
  const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';

  document.addEventListener('DOMContentLoaded', initMessagesModule);

  function initMessagesModule() {
    if (!$('convList') || !$('chatPanel')) return;

    window.openConversation = openConversation;
    window.BashaBariMessages = { loadConversations, openConversation, stopPolling, startPolling };

    bindMessageUI();
    maybeActivateFromURL();
    loadConversations().then(() => openFromURLIfRequested());

   
    document.querySelectorAll('.dash-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          if (btn.dataset.section === 'messages') {
            loadConversations().then(() => {
              if (activeConnectionId) startPolling();
            });
          } else {
            stopPolling();
          }
        }, 50);
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopPolling();
      else if (isMessagesSectionActive() && activeConnectionId) startPolling();
    });

    document.addEventListener('click', e => {
      const msgBtn = e.target.closest('.btn-msg-conn');
      if (!msgBtn) return;
      const connId = msgBtn.dataset.connId;
      setTimeout(() => loadConversations().then(() => connId && openConversation(connId)), 120);
    });

    const msgSection = $('section-messages');
    if (msgSection) {
      new MutationObserver(() => {
        if (isMessagesSectionActive()) loadConversations().then(() => activeConnectionId && startPolling());
        else stopPolling();
      }).observe(msgSection, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function bindMessageUI() {
    document.querySelectorAll('.conv-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.conv-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter || 'all';
        loadConversations();
      });
    });

    const sendBtn = $('chatSendBtn');
    const input = $('chatInput');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    const imgInput = $('chatImgInput');
    if (imgInput) {
      imgInput.addEventListener('change', handleImageSelected);
    }
  }

  function maybeActivateFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('section') === 'messages' || params.get('open_connection')) {
      document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
      document.querySelector('.dash-nav-item[data-section="messages"]')?.classList.add('active');
      document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
      $('section-messages')?.classList.add('active');
    }
  }

  function openFromURLIfRequested() {
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open_connection') || params.get('connection_id');
    const userId = params.get('user_id');
    if (openId) {
      openConversation(openId);
      return;
    }
    if (userId) {
      const match = conversations.find(c => String(c.other_user?.id) === String(userId));
      if (match) openConversation(match.connection_id);
    }
  }

  function isMessagesSectionActive() {
    const section = $('section-messages');
    return !!section && section.classList.contains('active');
  }

  function apiTypeParam() {
    if (activeFilter === 'listings') return '&type=listing';
    if (activeFilter === 'connections') return '&type=connection';
    return '';
  }

  function loadConversations() {
    const list = $('convList');
    if (!list) return Promise.resolve();
    list.innerHTML = '<div class="empty-state" style="padding:30px;"><span class="material-symbols-outlined">hourglass_top</span><p>Loading conversations...</p></div>';

    return fetch('api/messages/get-conversations.php?' + apiTypeParam().replace(/^&/, ''))
      .then(handleJSON)
      .then(data => {
        conversations = data.conversations || [];
        renderConversationList();
      })
      .catch(err => {
        if (err.status === 401) return handleAuthExpired();
        list.innerHTML = `<div class="empty-state" style="padding:30px;"><span class="material-symbols-outlined">error</span><p>${escapeHTML(err.message || 'Could not load conversations')}</p></div>`;
      });
  }

  function renderConversationList() {
    const list = $('convList');
    if (!list) return;
    if (!conversations.length) {
      list.innerHTML = '<div class="empty-state" style="padding:30px;"><span class="material-symbols-outlined">chat_bubble_outline</span><p>No conversations</p></div>';
      renderEmptyState();
      updateMessageBadge();
      return;
    }

    list.innerHTML = '';
    conversations.forEach(conv => {
      const other = conv.other_user || {};
      const last = conv.last_message || {};
      const preview = last.image_path ? '📷 Image' : (last.message_text || 'Start a conversation');
      const item = document.createElement('div');
      item.className = 'conv-item' + (String(activeConnectionId) === String(conv.connection_id) ? ' active' : '');
      item.dataset.connectionId = conv.connection_id;
      item.innerHTML = `
        <div class="conv-avatar">
          ${other.profile_picture ? `<img src="${escapeAttr(other.profile_picture)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : escapeHTML(getInitials(other.name || 'User'))}
          ${conv.unread_count > 0 ? '<div class="conv-unread-dot"></div>' : ''}
        </div>
        <div class="conv-info">
          <div class="conv-name">${escapeHTML(other.name || 'Student')}</div>
          <div class="conv-last-msg">${escapeHTML(preview)}</div>
        </div>
        <div class="conv-time">${formatRelativeTime(last.created_at || conv.created_at)}</div>
        ${conv.unread_count > 0 ? `<span class="conv-unread-count">${conv.unread_count}</span>` : ''}
      `;
      item.addEventListener('click', () => openConversation(conv.connection_id));
      list.appendChild(item);
    });
    updateMessageBadge();
  }

  function renderEmptyState() {
    const empty = $('chatEmpty');
    const thread = $('chatThread');
    if (empty && !activeConnectionId) empty.style.display = 'flex';
    if (thread && !activeConnectionId) thread.style.display = 'none';
  }

  function openConversation(connectionId) {
    connectionId = String(connectionId);
    activeConnectionId = connectionId;
    lastMessageId = 0;

    document.querySelectorAll('.conv-item').forEach(el => {
      el.classList.toggle('active', String(el.dataset.connectionId) === connectionId);
    });

    const conv = conversations.find(c => String(c.connection_id) === connectionId);
    const other = conv?.other_user || { name: 'Conversation' };
    const empty = $('chatEmpty');
    const thread = $('chatThread');
    const header = $('chatHeader');
    const messages = $('chatMessages');

    if (empty) empty.style.display = 'none';
    if (thread) thread.style.display = 'flex';
    if (messages) messages.innerHTML = '';
    if (header) {
      header.innerHTML = `
        <div class="chat-header-avatar">${other.profile_picture ? `<img src="${escapeAttr(other.profile_picture)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : escapeHTML(getInitials(other.name || 'User'))}</div>
        <div>
          <div class="chat-header-name">${escapeHTML(other.name || 'Student')}</div>
          <div class="chat-header-status">● Connected</div>
        </div>`;
    }

    setComposerDisabled(false);
    loadMessages(connectionId, 0);
    stopPolling();
    startPolling();
  }

  function loadMessages(connectionId, afterId) {
    return fetch(`api/messages/get-messages.php?connection_id=${encodeURIComponent(connectionId)}&after_id=${encodeURIComponent(afterId || 0)}`)
      .then(handleJSON)
      .then(data => {
        const msgs = data.messages || [];
        msgs.forEach(appendMessage);
        if (msgs.length) {
          lastMessageId = Math.max(lastMessageId, ...msgs.map(m => Number(m.id) || 0));
        } else if (!afterId && $('chatMessages')) {
          $('chatMessages').innerHTML = '<div style="text-align:center;color:#94a3b8;font-size:13px;padding:20px;">Start a conversation!</div>';
        }
        scrollToBottom();
        zeroUnread(connectionId);
      })
      .catch(err => {
        if (err.status === 401) return handleAuthExpired();
        showToast(err.message || 'Could not load messages', 'error');
      });
  }

  function appendMessage(message) {
    const container = $('chatMessages');
    if (!container) return;
    const intro = container.querySelector('[style*="Start a conversation"]');
    if (intro) container.innerHTML = '';

    if (container.querySelector(`[data-message-id="${message.id}"]`)) return;

    const user = currentUser();
    const mine = user && String(message.sender_id) === String(user.id);
    const row = document.createElement('div');
    row.className = 'chat-msg ' + (mine ? 'sent' : 'received');
    row.dataset.messageId = message.id;

    const parts = [];
    if (message.image_path) parts.push(`<img src="${escapeAttr(message.image_path)}" class="chat-msg-img" alt="Image"/>`);
    if (message.message_text) parts.push(`<div class="chat-bubble">${escapeHTML(message.message_text)}</div>`);
    parts.push(`<div class="chat-meta"><span class="chat-time">${formatTime(message.created_at)}</span>${mine ? `<span class="chat-tick ${Number(message.is_seen) ? 'seen' : ''}">${Number(message.is_seen) ? '✓✓' : '✓'}</span>` : ''}</div>`);
    row.innerHTML = parts.join('');
    container.appendChild(row);
  }

  function pollNewMessages() {
    if (!activeConnectionId || !isMessagesSectionActive()) return;
    const container = $('chatMessages');
    const wasAtBottom = !container || (container.scrollTop + container.clientHeight >= container.scrollHeight - 80);

    fetch(`api/messages/get-messages.php?connection_id=${encodeURIComponent(activeConnectionId)}&after_id=${encodeURIComponent(lastMessageId)}`)
      .then(handleJSON)
      .then(data => {
        const msgs = data.messages || [];
        if (msgs.length) {
          msgs.forEach(appendMessage);
          lastMessageId = Math.max(lastMessageId, ...msgs.map(m => Number(m.id) || 0));
          if (wasAtBottom) scrollToBottom();
        }
        pollCounter += 1;
        if (pollCounter % 5 === 0) loadConversations();
      })
      .catch(err => {
        if (err.status === 401) return handleAuthExpired();
      });
  }

  function startPolling() {
    stopPolling();
    if (!activeConnectionId) return;
    pollingInterval = setInterval(pollNewMessages, 3000);
  }

  function stopPolling() {
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = null;
  }

  function sendMessage() {
    const input = $('chatInput');
    const text = input ? input.value.trim() : '';
    if (!activeConnectionId || !text) return;

    const fd = new FormData();
    fd.append('connection_id', activeConnectionId);
    fd.append('message_text', text);

    fetch('api/messages/send-message.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrf() },
      body: fd
    })
      .then(handleJSON)
      .then(data => {
        if (input) input.value = '';
        appendMessage(data.message);
        lastMessageId = Math.max(lastMessageId, Number(data.message.id) || 0);
        scrollToBottom();
        loadConversations();
      })
      .catch(err => {
        if (err.status === 401) return handleAuthExpired();
        if ((err.message || '').toLowerCase().includes('not connected')) {
          setComposerDisabled(true);
          showToast('You are no longer connected with this user. Reconnect to message.', 'error');
        } else {
          showToast(err.message || 'Could not send message', 'error');
        }
      });
  }

  function handleImageSelected(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file || !activeConnectionId) return;
    const fd = new FormData();
    fd.append('image', file);
    fetch('api/messages/upload-chat-image.php', { method: 'POST', headers: { 'X-CSRF-Token': csrf() }, body: fd })
      .then(handleJSON)
      .then(data => {
        const msgFd = new FormData();
        msgFd.append('connection_id', activeConnectionId);
        msgFd.append('image_path', data.image_path);
        return fetch('api/messages/send-message.php', { method: 'POST', headers: { 'X-CSRF-Token': csrf() }, body: msgFd });
      })
      .then(handleJSON)
      .then(data => {
        appendMessage(data.message);
        lastMessageId = Math.max(lastMessageId, Number(data.message.id) || 0);
        scrollToBottom();
        loadConversations();
      })
      .catch(err => {
        if (err.status === 401) return handleAuthExpired();
        showToast(err.message || 'Could not send image', 'error');
      });
  }

  function zeroUnread(connectionId) {
    conversations = conversations.map(c => String(c.connection_id) === String(connectionId) ? { ...c, unread_count: 0 } : c);
    const item = document.querySelector(`.conv-item[data-connection-id="${connectionId}"]`);
    item?.querySelector('.conv-unread-dot')?.remove();
    item?.querySelector('.conv-unread-count')?.remove();
    updateMessageBadge();
  }

  function updateMessageBadge() {
    const total = conversations.reduce((sum, c) => sum + (Number(c.unread_count) || 0), 0);
    const badge = $('msgBadge');
    if (badge) {
      badge.textContent = String(total);
      badge.style.display = total > 0 ? '' : 'none';
    }
  }

  function setComposerDisabled(disabled) {
    const input = $('chatInput');
    const send = $('chatSendBtn');
    const img = $('chatImgInput');
    if (input) input.disabled = disabled;
    if (send) send.disabled = disabled;
    if (img) img.disabled = disabled;
  }

  function scrollToBottom() {
    const container = $('chatMessages');
    if (container) container.scrollTop = container.scrollHeight;
  }

  function handleJSON(response) {
    return response.json().then(data => {
      if (!response.ok || data.success === false) {
        const err = new Error(data.error || 'Request failed');
        err.status = response.status;
        throw err;
      }
      return data;
    });
  }

  function handleAuthExpired() {
    localStorage.removeItem('bashabari_user');
    window.location.href = 'index.php';
  }

  function showToast(message, type) {
    if (window.BashaBari?.showToast) window.BashaBari.showToast(message, type || 'info');
    else console[type === 'error' ? 'error' : 'log'](message);
  }

  function getInitials(name) {
    return String(name || 'U').trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || 'U';
  }

  function formatTime(value) {
    if (!value) return '';
    const d = new Date(String(value).replace(' ', 'T'));
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatRelativeTime(value) {
    if (!value) return '';
    const d = new Date(String(value).replace(' ', 'T'));
    if (Number.isNaN(d.getTime())) return '';
    const diff = Date.now() - d.getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'now';
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const day = Math.floor(hr / 24);
    return `${day}d`;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return escapeHTML(str).replace(/"/g, '&quot;');
  }

  function safeJSON(str) {
    try { return JSON.parse(str); } catch { return null; }
  }
})();
