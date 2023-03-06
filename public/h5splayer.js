function H5sPlayerWS (t) { var s; this.sourceBuffer, this.buffer = [], this.t, this.video, this.s, this.i, this.o, this.h = 0, this.l = 0, this.u = 0, this.C = !1, this.S = !1, this.v = !1, this.H, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), this.k = t, !0 === this.p && console.log('[WS] Websocket Conf:', t), this.R = t.videoid, this.P = t.pbconf, this.W = t.token, void 0 === this.R ? (this.T = t.videodom, !0 === this.p && console.log('[WS] use dom directly', t.token)) : (this.T = document.getElementById(this.R), !0 === this.p && console.log('[WS] use videoid', t.token)), this.video = this.T, void 0 != this.P && this.P.showposter == 'false' || (s = this.k.protocol + '//' + this.k.host + this.k.rootpath + 'api/v1/GetImage?token=' + this.W + '&session=' + this.k.session, !0 === this.p && console.log('[WS] connect src', t.token), this.T.setAttribute('poster', s)); } function H5sPlayerRTC (t) { var s; this.s, this.o, this.C = !1, this.S = !1, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), this.k = t, this.R = t.videoid, this.P = t.pbconf, this.W = t.token, void 0 === this.R ? (this.T = t.videodom, !0 === this.p && console.log('[RTC] use dom directly', t.token)) : (this.T = document.getElementById(this.R), !0 === this.p && console.log('[RTC] use videoid', t.token)), this.video = this.T, this.A = null, this.I = { optional: [{ DtlsSrtpKeyAgreement: !0 }] }, this.m = { mandatory: { offerToReceiveAudio: !0, offerToReceiveVideo: !0 } }, this.O = { iceServers: [] }, this.F = [], void 0 != this.P && this.P.showposter == 'false' || (s = this.k.protocol + '//' + this.k.host + this.k.rootpath + 'api/v1/GetImage?token=' + this.W + '&session=' + this.k.session, !0 === this.p && console.log('[RTC] connect src', t.token), this.T.setAttribute('poster', s)); } function createRTCSessionDescription (t) { return new RTCSessionDescription(t); } function H5sPlayerHls (t) { this.s, this.o, this.k = t, this.R = t.videoid, this.W = t.token, this.N, this.M = t.hlsver, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), void 0 === this.R ? (this.T = t.videodom, !0 === this.p && console.log('[HLS] use dom directly', t.token)) : (this.T = document.getElementById(this.R), !0 === this.p && console.log('[HLS] use videoid', t.token)), this.J = this.T, this.J.type = 'application/x-mpegURL', this._ = 0, this.D = 0; var s = this.k.protocol + '//' + window.location.host + '/api/v1/GetImage?token=' + this.W + '&session=' + this.k.session; this.T.setAttribute('poster', s); } function H5sPlayerAudio (t) { this.buffer = [], this.s, this.C = !1, this.S = !1, this.k = t, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), !0 === this.p && console.log('[AUD] Aduio Player Conf:', t), this.W = t.token, this.g = new AudioContext(); } function H5sPlayerAudBack (t) { this.buffer = [], this.s, this.C = !1, this.S = !1, this.k = t, this.U = 0, this.L = 48e3, this.B = !1, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), !0 === this.p && console.log('[AUDBACK] Aduio Back Conf:', t), this.W = t.token, this.g = new AudioContext(), !0 === this.p && console.log('[AUDBACK] sampleRate', this.g.sampleRate), this.K(); } function float32ToInt16 (t) { for (var s = t.length, i = new Int16Array(s); s--;)i[s] = 32767 * Math.min(1, t[s]); return i; } function H5sConference (t) { this.s, this.o, this.C = !1, this.S = !1, this.V = !1, this.G, this.j, this.p = !0, void 0 !== t.consolelog && t.consolelog === 'false' && (this.p = !1), this.k = t, void 0 === t.localvideoid ? (this.q = t.localvideodom, !0 === this.p && console.log(t.token, '[CFE] local use dom directly')) : (this.q = document.getElementById(t.localvideoid), !0 === this.p && console.log(t.token, '[CFE] local use videoid')), void 0 === t.remotevideoid ? (this.X = t.remotevideodom, !0 === this.p && console.log(t.token, '[CFE] remote use dom directly')) : (this.X = document.getElementById(t.remotevideoid), !0 === this.p && console.log(t.token, '[CFE] remote use videoid')), this.A = null, this.I = { optional: [{ DtlsSrtpKeyAgreement: !0 }] }, this.m = { mandatory: { offerToReceiveAudio: !0, offerToReceiveVideo: !0 } }, this.O = { iceServers: [] }, this.F = []; } function createRTCSessionDescription (t) { return new RTCSessionDescription(t); }H5sPlayerWS.prototype.Y = function () { !0 === this.C && (!0 === this.p && console.log('[WS] Reconnect...'), this.Z(this.W), this.C = !1); }, H5sPlayerWS.prototype.$ = function (t) { var s; !0 === this.p && console.log('[WS] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log(this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sPlayerWS.prototype.tt = function () { if (this.sourceBuffer !== null && void 0 !== this.sourceBuffer) { if (this.buffer.length !== 0 && !this.sourceBuffer.updating) try { var t = this.buffer.shift(), s = new Uint8Array(t); this.sourceBuffer.appendBuffer(s); } catch (t) { !0 === this.p && console.log(t); } } else !0 === this.p && console.log('[WS] is null or undefined', this.sourceBuffer); }, H5sPlayerWS.prototype.st = function () { try { var t = { cmd: 'H5_KEEPALIVE' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerWS.prototype.it = function (t) { return t.data, ArrayBuffer, typeof t.data === 'string' ? (!0 === this.p && console.log('[WS] string'), void (void 0 != this.P && void 0 != this.P.callback && this.P.callback(t.data, this.P.userdata))) : !0 !== this.S ? !1 === this.v ? (this.H = String.fromCharCode.apply(null, new Uint8Array(t.data)), this.et(this), void (this.v = !0)) : (this.buffer.push(t.data), void this.tt()) : void 0; }, H5sPlayerWS.prototype.et = function (t) { try { window.MediaSource = window.MediaSource || window.WebKitMediaSource, window.MediaSource || !0 === t.p && console.log('[WS] MediaSource API is not available'); var s = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'; 'MediaSource' in window && MediaSource.isTypeSupported(s) ? !0 === t.p && console.log('[WS] MIME type or codec: ', s) : !0 === t.p && console.log('[WS] Unsupported MIME type or codec: ', s), t.t = new window.MediaSource(), t.video.autoplay = !0, !0 === t.p && console.log(t.R); t.video.src = window.URL.createObjectURL(t.t), t.video.play(), t.t.addEventListener('sourceopen', t.ot.bind(t), !1); } catch (s) { !0 === t.p && console.log(s); } }, H5sPlayerWS.prototype.ot = function () { !0 === this.p && console.log('[WS] Add SourceBuffer'), this.sourceBuffer = this.t.addSourceBuffer(this.H), this.t.duration = 1 / 0, this.t.removeEventListener('sourceopen', this.ot, !1), this.sourceBuffer.addEventListener('updateend', this.tt.bind(this), !1); }, H5sPlayerWS.prototype.Z = function (t) { this.video.autoplay = !0; var s = 'api/v1/h5swsapi', i = 'main'; if (void 0 === this.k.streamprofile || (i = this.k.streamprofile), void 0 === this.P)s = this.k.rootpath + s + '?token=' + t + '&profile=' + i + '&session=' + this.k.session; else { var e = 'false', o = 'fake'; void 0 === this.P.serverpb || (e = this.P.serverpb), void 0 === this.P.filename || (o = this.P.filename), s = this.k.rootpath + s + '?token=' + t + '&playback=true&profile=' + i + '&serverpb=' + e + '&begintime=' + encodeURIComponent(this.P.begintime) + '&endtime=' + encodeURIComponent(this.P.endtime) + '&filename=' + o + '&session=' + this.k.session; } this.k.session, !0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[WS] setupWebSocket', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = function () { !0 === this.nt.p && console.log('[WS] wsSocket.onopen', this.nt), this.nt.i = setInterval(this.nt.ht.bind(this.nt), 1e4), this.nt.o = setInterval(this.nt.st.bind(this.nt), 1e3), void 0 != this.nt.P && this.nt.P.autoplay === 'true' && this.nt.start(); }, this.s.onclose = function () { !0 === this.nt.p && console.log('[WS] wsSocket.onclose', this.nt), !0 === this.nt.S ? !0 === this.nt.p && console.log('[WS] wsSocket.onclose disconnect') : this.nt.C = !0, this.nt.ct(this.nt), this.nt.rt(this.nt), this.nt.H = '', this.nt.v = !1; }; }, H5sPlayerWS.prototype.ct = function (t) { !0 === t.p && console.log('[WS] Cleanup Source Buffer', t); try { t.sourceBuffer.removeEventListener('updateend', t.tt, !1), t.sourceBuffer.abort(), document.documentMode || /Edge/.test(navigator.userAgent) ? !0 === t.p && console.log('[WS] IE or EDGE!') : t.t.removeSourceBuffer(t.sourceBuffer), t.sourceBuffer = null, t.t = null, t.buffer = []; } catch (s) { !0 === t.p && console.log(s); } }, H5sPlayerWS.prototype.rt = function (t) { !0 === t.p && console.log('[WS] CleanupWebSocket', t), clearInterval(t.o), clearInterval(t.i), t.h = 0, t.l = 0, t.u = 0; }, H5sPlayerWS.prototype.ht = function () { if (void 0 === this.P) { !0 === this.S && (!0 === this.p && console.log('[WS] CheckSourceBuffer has been disconnect', this), clearInterval(this.o), clearInterval(this.i), clearInterval(this.at)); try { if (!0 === this.p && console.log('[WS] CheckSourceBuffer', this), this.sourceBuffer.buffered.length <= 0) { if (this.h++, this.h > 8) return !0 === this.p && console.log('[WS] CheckSourceBuffer Close 1'), void this.s.close(); } else { this.h = 0; this.sourceBuffer.buffered.start(0); var t = this.sourceBuffer.buffered.end(0), s = t - this.video.currentTime; if (s > 5 || s < 0) return !0 === this.p && console.log('[WS] CheckSourceBuffer Close 2', s), void this.s.close(); if (t == this.l) { if (this.u++, this.u > 3) return !0 === this.p && console.log('[WS] CheckSourceBuffer Close 3'), void this.s.close(); } else this.u = 0; this.l = t; } } catch (t) { !0 === this.p && console.log(t); } } }, H5sPlayerWS.prototype.connect = function () { this.Z(this.W), this.at = setInterval(this.Y.bind(this), 3e3); }, H5sPlayerWS.prototype.disconnect = function () { !0 === this.p && console.log('[WS] disconnect', this), this.S = !0, clearInterval(this.at), this.s != null && (this.s.close(), this.s = null), !0 === this.p && console.log('[WS] disconnect', this); }, H5sPlayerWS.prototype.start = function () { try { var t = { cmd: 'H5_START' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerWS.prototype.pause = function () { try { var t = { cmd: 'H5_PAUSE' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerWS.prototype.resume = function () { try { var t = { cmd: 'H5_RESUME' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerWS.prototype.seek = function (t) { try { var s = { cmd: 'H5_SEEK' }; s.nSeekTime = t, this.s.send(JSON.stringify(s)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerWS.prototype.speed = function (t) { try { var s = { cmd: 'H5_SPEED' }; s.nSpeed = t, this.s.send(JSON.stringify(s)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.Y = function () { !0 === this.C && (!0 === this.p && console.log('[RTC] Reconnect...'), this.Z(this.W), this.C = !1); }, H5sPlayerRTC.prototype.$ = function (t) { var s; !0 === this.p && console.log('[RTC] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log(this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sPlayerRTC.prototype.st = function () { try { var t = { type: 'keepalive' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.lt = function (t) { if (t.candidate) { var s; !0 === this.p && console.log('[RTC] onIceCandidate currentice', t.candidate), s = t.candidate, !0 === this.p && console.log('[RTC] onIceCandidate currentice', JSON.stringify(s)); var i = JSON.parse(JSON.stringify(s)); i.type = 'remoteice', !0 === this.p && console.log('[RTC] onIceCandidate currentice new', JSON.stringify(i)), this.s.send(JSON.stringify(i)); } else !0 === this.p && console.log('End of candidates.'); }, H5sPlayerRTC.prototype.ut = function (t) { var s; !0 === this.p && console.log('[RTC] Remote track added:' + JSON.stringify(t)), s = t.ft ? t.ft[0] : t.stream; var i = this.T; i.src = URL.createObjectURL(s), i.play(); }, H5sPlayerRTC.prototype.dt = function () { !0 === this.p && console.log('[RTC] createPeerConnection  config: ' + JSON.stringify(this.O) + ' option:' + JSON.stringify(this.I)); var t = new RTCPeerConnection(this.O, this.I), s = this; return t.onicecandidate = function (t) { s.lt.call(s, t); }, void 0 !== t.Ct ? t.Ct = function (t) { s.ut.call(s, t); } : t.onaddstream = function (t) { s.ut.call(s, t); }, t.oniceconnectionstatechange = function (i) { !0 === s.p && console.log('[RTC] oniceconnectionstatechange  state: ' + t.iceConnectionState); }, !0 === this.p && console.log('[RTC] Created RTCPeerConnnection with config: ' + JSON.stringify(this.O) + 'option:' + JSON.stringify(this.I)), t; }, H5sPlayerRTC.prototype.St = function (t) { !0 === this.p && console.log('[RTC] ProcessRTCOffer', t); try { this.A = this.dt(), this.F.length = 0; var s = this; !0 === this.p && console.log('[RTC] createRTCSessionDescription '), this.A.setRemoteDescription(createRTCSessionDescription(t)), this.A.createAnswer(this.m).then(function (t) { !0 === s.p && console.log('[RTC] Create answer:' + JSON.stringify(t)), s.A.setLocalDescription(t, function () { !0 === s.p && console.log('[RTC] ProcessRTCOffer createAnswer', t), s.s.send(JSON.stringify(t)); }, function () {}); }, function (t) { alert('[RTC] Create awnser error:' + JSON.stringify(t)); }); } catch (t) { this.disconnect(), alert('[RTC] connect error: ' + t); } }, H5sPlayerRTC.prototype.vt = function (t) { !0 === this.p && console.log('[RTC] ProcessRemoteIce', t); try { var s = new RTCIceCandidate({ sdpMLineIndex: t.sdpMLineIndex, candidate: t.candidate }); !0 === this.p && console.log('[RTC] ProcessRemoteIce', s), !0 === this.p && console.log('[RTC] Adding ICE candidate :' + JSON.stringify(s)), this.A.addIceCandidate(s, function () { console.log('[RTC] addIceCandidate OK'); }, function (t) { console.log('[RTC] addIceCandidate error:' + JSON.stringify(t)); }); } catch (t) { alert('connect ProcessRemoteIce error: ' + t); } }, H5sPlayerRTC.prototype.it = function (t) { t.data, ArrayBuffer, t.data, !0 === this.p && console.log('[RTC] RTC received ', t.data); var s = JSON.parse(t.data); return !0 === this.p && console.log('[RTC] Get Message type ', s.type), s.type === 'offer' ? (!0 === this.p && console.log('[RTC] Process Message type ', s.type), void this.St(s)) : s.type === 'remoteice' ? (!0 === this.p && console.log('[RTC] Process Message type ', s.type), void this.vt(s)) : void (void 0 != this.P && void 0 != this.P.callback && this.P.callback(t.data, this.P.userdata)); }, H5sPlayerRTC.prototype.Z = function (t) { this.video.autoplay = !0; var s = 'api/v1/h5srtcapi', i = 'main'; if (void 0 === this.k.streamprofile || (i = this.k.streamprofile), void 0 === this.P)s = this.k.rootpath + s + '?token=' + t + '&profile=' + i + '&session=' + this.k.session; else { var e = 'false', o = 'fake'; void 0 === this.P.serverpb || (e = this.P.serverpb), void 0 === this.P.filename || (o = this.P.filename), s = this.k.rootpath + s + '?token=' + t + '&playback=true&profile=' + i + '&serverpb=' + e + '&begintime=' + encodeURIComponent(this.P.begintime) + '&endtime=' + encodeURIComponent(this.P.endtime) + '&filename=' + o + '&session=' + this.k.session; }!0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[RTC] setupWebSocket', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = function () { !0 === this.nt.p && console.log('[RTC] wsSocket.onopen', this.nt); var t = { type: 'open' }; this.nt.s.send(JSON.stringify(t)), this.nt.o = setInterval(this.nt.st.bind(this.nt), 1e3), void 0 != this.nt.P && this.nt.P.autoplay === 'true' && this.nt.start(); }, this.s.onclose = function () { !0 === this.p && console.log('[RTC] wsSocket.onclose', this.nt), !0 === this.nt.S ? !0 === this.nt.p && console.log('[RTC] wsSocket.onclose disconnect') : this.nt.C = !0, this.nt.rt(this.nt); }; }, H5sPlayerRTC.prototype.rt = function (t) { !0 === t.p && console.log('[RTC] CleanupWebSocket', t), clearInterval(t.o); }, H5sPlayerRTC.prototype.connect = function () { this.Z(this.W), this.at = setInterval(this.Y.bind(this), 3e3); }, H5sPlayerRTC.prototype.disconnect = function () { if (!0 === this.p && console.log('[RTC] disconnect', this), this.S = !0, clearInterval(this.at), this.s != null && (this.s.close(), this.s = null), this.T && (this.T.src = ''), this.A) { try { this.A.close(); } catch (t) { !0 === this.p && console.log('[RTC] close peer connection failed:' + t); } this.A = null; }!0 === this.p && console.log('[RTC] disconnect', this); }, H5sPlayerRTC.prototype.start = function () { try { var t = { cmd: 'H5_START' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.pause = function () { try { var t = { cmd: 'H5_PAUSE' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.resume = function () { try { var t = { cmd: 'H5_RESUME' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.seek = function (t) { try { var s = { cmd: 'H5_SEEK' }; s.nSeekTime = t, this.s.send(JSON.stringify(s)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerRTC.prototype.speed = function (t) { try { var s = { cmd: 'H5_SPEED' }; s.nSpeed = t, this.s.send(JSON.stringify(s)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerHls.prototype.$ = function (t) { var s; !0 === this.p && console.log('[HLS] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log('[HLS] ', this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sPlayerHls.prototype.st = function () { try { var t = { type: 'keepalive' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerHls.prototype.it = function (t) { !0 === this.p && console.log('[HLS] HLS received ', t.data); }, H5sPlayerHls.prototype.Z = function (t) { var s = 'api/v1/h5swscmnapi'; s = this.k.rootpath + s + '?token=' + t + '&session=' + this.k.session, !0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[HLS] setupWebSocket', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = function () { !0 === this.nt.p && console.log('[HLS] wsSocket.onopen', this.nt), this.nt.o = setInterval(this.nt.st.bind(this.nt), 1e3); }, this.s.onclose = function () { !0 === this.nt.p && console.log('[HLS] wsSocket.onclose', this.nt), this.nt.rt(this.nt); }; }, H5sPlayerHls.prototype.rt = function (t) { !0 === t.p && console.log('[HLS] H5sPlayerHls CleanupWebSocket', t), clearInterval(t.o); }, H5sPlayerHls.prototype.yt = function () { !0 === this.p && console.log('[HLS]  video.ended', this.J.ended), !0 === this.p && console.log('[HLS] video.currentTime', this.J.currentTime); var t = this.J.currentTime, s = t - this._; !0 === this.p && console.log('[HLS]  diff', s), s === 0 && this.D++, this._ = t, this.D > 3 && (this.s != null && (this.s.close(), this.s = null), this.Z(this.W), !0 === this.p && console.log('[HLS] reconnect'), this.J.src = '', this._ = 0, this.D = 0, this.J.src = this.k.protocol + '//' + this.k.host + this.k.rootpath + 'hls/' + this.M + '/' + this.W + '/hls.m3u8', this.J.play()); }, H5sPlayerHls.prototype.connect = function () { this.Z(this.W), this._ = 0, this.D = 0, this.J.onended = function (t) { !0 === this.p && console.log('[HLS] The End'); }, this.J.onpause = function (t) { !0 === this.p && console.log('[HLS] Pause'); }, this.J.onplaying = function (t) { !0 === this.p && console.log('[HLS] Playing'); }, this.J.onseeking = function (t) { !0 === this.p && console.log('[HLS] seeking'); }, this.J.onvolumechange = function (t) { !0 === this.p && console.log('[HLS] volumechange'); }, this.J.src = this.k.protocol + '//' + this.k.host + this.k.rootpath + 'hls/' + this.M + '/' + this.W + '/hls.m3u8', this.J.play(), this.N = setInterval(this.yt.bind(this), 3e3); }, H5sPlayerHls.prototype.disconnect = function () { clearInterval(this.N), this._ = 0, this.D = 0, this.s != null && (this.s.close(), this.s = null), !0 === this.p && console.log('[HLS] disconnect', this); }, H5sPlayerAudio.prototype.$ = function (t) { var s; !0 === this.p && console.log('[AUD] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log(this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sPlayerAudio.prototype.st = function () { try { this.s.send('keepalive'); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerAudio.prototype.it = function (t) { for (var s = new Int16Array(t.data), i = s.length, e = this.g.createBuffer(1, i, 8e3), o = 0; o < 1; o++) for (var n = e.getChannelData(o), h = 0; h < i; h++)n[h] = s[h] / 16383.5; var c = this.g.createBufferSource(); c.buffer = e, c.connect(this.g.destination), c.start(); }, H5sPlayerAudio.prototype.rt = function (t) { !0 === t.p && console.log('[AUD] CleanupWebSocket', t), clearInterval(t.o); }, H5sPlayerAudio.prototype.Z = function (t) { var s = 'api/v1/h5saudapi'; s = this.k.rootpath + s + '?token=' + t + '&session=' + this.k.session, !0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[AUD] setupWebSocket for audio', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = function () { !0 === this.nt.p && console.log('[AUD] wsSocket.onopen', this.nt), this.nt.o = setInterval(this.nt.st.bind(this.nt), 1e3); }, this.s.onclose = function () { !0 === this.nt.p && console.log('[AUD] wsSocket.onclose', this.nt), this.nt.rt(this.nt); }; }, H5sPlayerAudio.prototype.connect = function () { this.Z(this.W); }, H5sPlayerAudio.prototype.disconnect = function () { !0 === this.p && console.log('[AUD] disconnect', this), this.s != null && (this.s.close(), this.s = null), !0 === this.p && console.log('[AUD] disconnect', this); }, H5sPlayerAudBack.prototype.$ = function (t) { var s; !0 === this.p && console.log('[AUDBACK] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log(this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sPlayerAudBack.prototype.st = function () { try { this.s.send('keepalive'); } catch (t) { !0 === this.p && console.log(t); } }, H5sPlayerAudBack.prototype.it = function (t) {}, H5sPlayerAudBack.prototype.rt = function (t) { !0 === this.p && console.log('[AUDBACK] CleanupWebSocket', t), clearInterval(t.o); }, H5sPlayerAudBack.prototype.K = function () { !0 === this.p && console.log('[AUDBACK] sampleRate', this.g.sampleRate), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.Ht; try { navigator.getUserMedia({ video: !1, audio: !0 }, this.pt.bind(this)); } catch (t) { return void alert('[AUDBACK] Audio back false getUserMedia', t); } }, H5sPlayerAudBack.prototype.Et = function () { this.B = !0; }, H5sPlayerAudBack.prototype.Z = function (t) { var s = 'api/v1/h5saudbackapi'; s = this.k.rootpath + s + '?token=' + t + '&samplerate=' + this.L + '&session=' + this.k.session, !0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[AUDBACK] setupWebSocket for audio back', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = this.Et.bind(this), this.s.onclose = function () { !0 === this.p && console.log('[AUDBACK] wsSocket.onclose', this.nt), this.nt.rt(this.nt); }; }, H5sPlayerAudBack.prototype.kt = function (t) { var s = float32ToInt16(t.inputBuffer.getChannelData(0)); !0 === this.B && this.s && this.s.send(s); }, H5sPlayerAudBack.prototype.pt = function (t) { try { var s = this.g.createMediaStreamSource(t), i = this.g.createScriptProcessor(1024, 1, 1); s.connect(i), i.connect(this.g.destination), i.onaudioprocess = this.kt.bind(this); } catch (t) { return void alert('Audio intecomm error', t); } }, H5sPlayerAudBack.prototype.connect = function () { this.Z(this.W); }, H5sPlayerAudBack.prototype.disconnect = function () { !0 === this.p && console.log('[AUDBACK] disconnect', this), this.s != null && (this.s.close(), this.s = null), !0 === this.p && console.log('[AUDBACK] disconnect', this); }, H5sConference.prototype.Y = function () { !0 === this.C && (!0 === this.p && console.log('Reconnect...'), this.Z(this.W), this.C = !1); }, H5sConference.prototype.$ = function (t) { var s; !0 === this.p && console.log('[CFE] H5SWebSocketClient'); try { this.k.protocol == 'http:' && (s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('ws://' + this.k.host + t) : new WebSocket('ws://' + this.k.host + t)), this.k.protocol == 'https:' && (!0 === this.p && console.log(this.k.host), s = typeof MozWebSocket !== 'undefined' ? new MozWebSocket('wss://' + this.k.host + t) : new WebSocket('wss://' + this.k.host + t)), !0 === this.p && console.log(this.k.host); } catch (t) { return void alert('error'); } return s; }, H5sConference.prototype.st = function () { try { var t = { type: 'CFE_CMD_KEEPALIVE' }, s = {}; s.strId = this.G, t.keepalive = s, this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } }, H5sConference.prototype.lt = function (t) { if (t.candidate) { var s; !0 === this.p && console.log('[CFE] onIceCandidate currentice', t.candidate), s = t.candidate, !0 === this.p && console.log('[CFE] onIceCandidate currentice', JSON.stringify(s)); var i = { type: 'CFE_CMD_REMOTE_ICE' }, e = {}; console.log('[CFE] remote Ice to', this.j), e.strTo = this.j, e.msg = s, i.remoteIce = e, this.s.send(JSON.stringify(i)); } else !0 === this.p && console.log('[CFE] End of candidates.'); }, H5sConference.prototype.ut = function (t) { var s; !0 === this.p && console.log('[CFE] Remote track added:' + JSON.stringify(t)), s = t.ft ? t.ft[0] : t.stream; var i = this.X; i.src = URL.createObjectURL(s), i.play(); }, H5sConference.prototype.dt = function () { !0 === this.p && console.log('[CFE] createPeerConnection  config: ' + JSON.stringify(this.O) + ' option:' + JSON.stringify(this.I)); var t = new RTCPeerConnection(this.O, this.I), s = this; return t.onicecandidate = function (t) { s.lt.call(s, t); }, void 0 !== t.Ct ? t.Ct = function (t) { s.ut.call(s, t); } : t.onaddstream = function (t) { s.ut.call(s, t); }, t.oniceconnectionstatechange = function (s) { !0 === this.p && console.log('[CFE] oniceconnectionstatechange  state: ' + t.iceConnectionState); }, !0 === this.p && console.log('[CFE] Created RTCPeerConnnection with config: ' + JSON.stringify(this.O) + 'option:' + JSON.stringify(this.I)), t; }, H5sConference.prototype.Rt = function (t) { !0 === this.p && console.log('[CFE] ProcessOffer', t); try { this.A = this.dt(), this.F.length = 0; var s = this; const i = this.wt.getVideoTracks(), e = this.wt.getAudioTracks(); i.length > 0 && console.log('[CFE] Using video device:', i[0].label), e.length > 0 && console.log('[CFE] Using audio device:', e[0].label), this.wt.getTracks().forEach(t => this.A.addTrack(t, this.wt)), !0 === this.p && console.log('[CFE] createRTCSessionDescription '), this.A.setRemoteDescription(createRTCSessionDescription(t)), this.A.createAnswer(this.m).then(function (t) { !0 === s.p && console.log('[CFE] Create answer:' + JSON.stringify(t)), s.A.setLocalDescription(t, function () { !0 === s.p && console.log('[CFE] ProcessOffer createAnswer', t); var i = { type: 'CFE_CMD_CALL_ANSWER' }, e = {}; console.log('[CFE] createAnswer to', s.j), e.strTo = s.j, e.msg = t, i.answer = e, s.s.send(JSON.stringify(i)); }, function () {}); }, function (t) { alert('[CFE ]Create awnser error:' + JSON.stringify(t)); }); } catch (t) { this.disconnect(), alert('connect error: ' + t); } }, H5sConference.prototype.Pt = function (t) { !0 === this.p && console.log('[CFE] ProcessAnswer', t); try { this.A.setRemoteDescription(createRTCSessionDescription(t)); } catch (t) { this.disconnect(), alert('connect error: ' + t); } }, H5sConference.prototype.Wt = async function () { !0 === this.p && console.log('[CFE] CreateOffer'); try { this.A = this.dt(), this.F.length = 0; var t = this; const s = this.wt.getVideoTracks(), i = this.wt.getAudioTracks(); return s.length > 0 && console.log('[CFE] Using video device:', s[0].label), i.length > 0 && console.log('[CFE] Using audio device:', i[0].label), this.wt.getTracks().forEach(t => this.A.addTrack(t, this.wt)), void this.A.createOffer(this.m).then(function (s) { !0 === t.p && console.log('[CFE] Create answer:' + JSON.stringify(s)), t.A.setLocalDescription(s, function () { !0 === t.p && console.log('[CFE] ProcessOffer createAnswer', s); var i = s; !0 === t.p && console.log('[CFE] createOffer ', JSON.stringify(i)); var e = { type: 'CFE_CMD_CALL_OFFER' }, o = {}; !0 === t.p && console.log('[CFE] createOffer to', t.j), o.strTo = t.j, o.msg = i, e.offer = o, t.s.send(JSON.stringify(e)); }, function () {}); }, function (t) { alert('[CFE ]Create offer error:' + JSON.stringify(t)); }); } catch (t) { this.disconnect(), alert('connect error: ' + t); } }, H5sConference.prototype.vt = function (t) { !0 === this.p && console.log('[CFE] ProcessRemoteIce', t); try { var s = new RTCIceCandidate({ sdpMLineIndex: t.sdpMLineIndex, candidate: t.candidate }); !0 === this.p && console.log('[CFE] ProcessRemoteIce', s), !0 === this.p && console.log('[CFE] Adding ICE candidate :' + JSON.stringify(s)), this.A.addIceCandidate(s, function () { console.log('[CFE] addIceCandidate OK'); }, function (t) { console.log('[CFE] addIceCandidate error:' + JSON.stringify(t)); }); } catch (t) { alert('connect ProcessRemoteIce error: ' + t); } }, H5sConference.prototype.it = function (t) { !0 === this.p && console.log('[CFE] received ', t.data); var s = JSON.parse(t.data); if (!0 === this.p && console.log('[CFE] Get Message type ', s.type), s.type !== 'CFE_CMD_INVITE_REQ') return s.type === 'CFE_CMD_INVITE_RESP' ? (this.j = s.inviteResp.strFrom, void this.Wt()) : void (s.type !== 'CFE_CMD_CALL_OFFER' ? s.type !== 'CFE_CMD_CALL_ANSWER' ? s.type !== 'CFE_CMD_REMOTE_ICE' ? (s.type === 'CFE_EVENT_ID_ASSIGN' && (this.G = s.idAssign.strId), void 0 != this.k.callback && this.k.callback(t.data, this.k.userdata)) : this.vt(s.remoteIce.msg) : this.Pt(s.answer.msg) : this.Rt(s.offer.msg)); }, H5sConference.prototype.Z = function (t) { this.q.autoplay = !0, this.X.autoplay = !0; var s = 'api/v1/h5sconference'; s = void 0 === this.G ? this.k.rootpath + s + '?name=' + this.k.name + '&session=' + this.k.session : this.k.rootpath + s + '?name=' + this.k.name + '?id=' + this.G + '&session=' + this.k.session, !0 === this.p && console.log(s), this.s = this.$(s), !0 === this.p && console.log('[CFE] setupWebSocket', this.s), this.s.binaryType = 'arraybuffer', this.s.nt = this, this.s.onmessage = this.it.bind(this), this.s.onopen = function () { !0 === this.nt.p && console.log('[CFE] wsSocket.onopen', this.nt), this.nt.o = setInterval(this.nt.st.bind(this.nt), 1e3), void 0 != this.nt.P && this.nt.P.autoplay === 'true' && this.nt.start(); }, this.s.onclose = function () { !0 === this.nt.p && console.log('[CFE] wsSocket.onclose', this.nt), !0 === this.nt.S ? !0 === this.nt.p && console.log('[CFE] wsSocket.onclose disconnect') : this.nt.C = !0, this.nt.rt(this.nt); }; }, H5sConference.prototype.rt = function (t) { !0 === t.p && console.log('[CFE] CleanupWebSocket', t), clearInterval(t.o); }, H5sConference.prototype.connect = function () { this.Z(this.W), this.at = setInterval(this.Y.bind(this), 3e3); }, H5sConference.prototype.call = async function (t, s) { if (this.V != 1) { try { try { const s = await navigator.mediaDevices.getUserMedia({ audio: !0, video: t }); t == 1 && (this.q.srcObject = s), this.wt = s; } catch (t) { alert('[CFE] getUserMedia error try HTTPS'); } var i = { type: 'CFE_CMD_INVITE_REQ' }, e = {}; e.strFrom = this.G, e.strTo = s, i.inviteReq = e, this.s.send(JSON.stringify(i)); } catch (t) { !0 === this.p && console.log(t); } this.V = !0; } }, H5sConference.prototype.answer = async function (t, s) { if (this.V != 1) { try { try { const s = await navigator.mediaDevices.getUserMedia({ audio: !0, video: t }); t == 1 && (this.q.srcObject = s), this.wt = s; } catch (t) { alert('[CFE] getUserMedia error try HTTPS'); } var i = { type: 'CFE_CMD_INVITE_RESP' }, e = {}; e.strFrom = this.G, e.strTo = s, this.j = s, i.inviteResp = e, this.s.send(JSON.stringify(i)); } catch (t) { !0 === this.p && console.log(t); } this.V = !0; } }, H5sConference.prototype.hangup = function () { if (this.V != 0) { try { var t = { cmd: 'H5_PAUSE' }; this.s.send(JSON.stringify(t)); } catch (t) { !0 === this.p && console.log(t); } if (this.q && (this.q.src = ''), this.X && (this.X.src = ''), this.wt && (this.wt = null), this.A) { try { this.A.close(); } catch (t) { !0 === this.p && console.log('[CFE] close peer connection failed:' + t); } this.A = null; } this.V = !1; } }, H5sConference.prototype.disconnect = function () { !0 === this.p && console.log('[CFE] disconnect', this), this.S = !0, clearInterval(this.at), this.hangup(), this.s != null && (this.s.close(), this.s = null), !0 === this.p && console.log('[CFE] disconnect', this); };
