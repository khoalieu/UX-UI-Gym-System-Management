// ============================================================
// receptionist.js – Màn hình dành cho Lễ tân (Receptionist)
// ============================================================

// ─── receptionist-dashboard ──────────────────────────────────
GF.screens['receptionist-dashboard'] = function(params) {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const checkinToday = (GFData.checkins || []).filter(c => c.date && c.date.startsWith(todayStr)).length || 12;
    const newMembers = (GFData.members || []).filter(m => m.joinDate && m.joinDate.startsWith(todayStr.slice(0, 7))).length || 3;
    const ptToday = (GFData.ptSessions || []).filter(s => s.date && s.date.startsWith(todayStr)).length || 5;
    const incidents = (GFData.maintenance || []).filter(i => i.status === 'in-progress').length || 2;

    const recentCheckins = (GFData.checkins || []).slice(0, 10);
    const ptSessions = (GFData.ptSessions || []).filter(s => s.date && s.date.startsWith(todayStr)).slice(0, 5);

    const mockCheckins = [
        { id: 'CI001', member: 'Nguyễn Văn An', memberId: 'MV001', time: '08:15', method: 'QR', status: 'success' },
        { id: 'CI002', member: 'Trần Thị Bình', memberId: 'MV002', time: '08:32', method: 'Thủ công', status: 'success' },
        { id: 'CI003', member: 'Lê Minh Cường', memberId: 'MV003', time: '09:01', method: 'QR', status: 'success' },
        { id: 'CI004', member: 'Phạm Thị Dung', memberId: 'MV004', time: '09:18', method: 'QR', status: 'denied' },
        { id: 'CI005', member: 'Hoàng Văn Emm', memberId: 'MV005', time: '09:45', method: 'QR', status: 'success' },
        { id: 'CI006', member: 'Ngô Thị Phương', memberId: 'MV006', time: '10:02', method: 'Thủ công', status: 'success' },
        { id: 'CI007', member: 'Đinh Văn Giang', memberId: 'MV007', time: '10:30', method: 'QR', status: 'success' },
        { id: 'CI008', member: 'Vũ Thị Hoa', memberId: 'MV008', time: '10:55', method: 'QR', status: 'denied' },
        { id: 'CI009', member: 'Bùi Minh Tuấn', memberId: 'MV009', time: '11:12', method: 'QR', status: 'success' },
        { id: 'CI010', member: 'Nguyễn Thị Lan', memberId: 'MV006', time: '11:30', method: 'QR', status: 'success' },
    ];

    const upcomingPT = [
        { time: '13:00', member: 'Trần Văn Bảo', pt: 'Phạm Minh Tuấn', room: 'Phòng PT 1', status: 'confirmed' },
        { time: '14:30', member: 'Lê Thị Cẩm', pt: 'Nguyễn Thị Hương', room: 'Phòng PT 2', status: 'confirmed' },
        { time: '15:00', member: 'Hoàng Văn Đức', pt: 'Trần Quang Minh', room: 'Phòng PT 1', status: 'pending' },
        { time: '16:00', member: 'Phạm Thị Mai', pt: 'Phạm Minh Tuấn', room: 'Phòng PT 3', status: 'confirmed' },
        { time: '17:30', member: 'Vũ Minh Long', pt: 'Nguyễn Thị Hương', room: 'Phòng PT 2', status: 'confirmed' },
    ];

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Dashboard Vận Hành</h1>
                <p class="page-subtitle text-muted">Tổng quan hoạt động hôm nay – ${GF.fmt.date(today.toISOString())}</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary" onclick="GF.navigate('receptionist-report-issue')">
                    <i class="bi bi-exclamation-triangle me-1"></i> Báo sự cố
                </button>
                <button class="btn btn-primary" onclick="GF.navigate('receptionist-checkin')">
                    <i class="bi bi-qr-code-scan me-1"></i> Check-in nhanh
                </button>
            </div>
        </div>

        <!-- Stats Row -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#EFF6FF;color:#2563EB">
                        <i class="bi bi-person-check-fill fs-4"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${checkinToday}</div>
                        <div class="stat-label">Check-in hôm nay</div>
                        <div class="stat-change positive"><i class="bi bi-arrow-up"></i> +3 so với hôm qua</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#F0FDF4;color:#10B981">
                        <i class="bi bi-person-plus-fill fs-4"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${newMembers}</div>
                        <div class="stat-label">Hội viên đăng ký mới</div>
                        <div class="stat-change positive"><i class="bi bi-arrow-up"></i> Tháng này</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#FFF7ED;color:#F59E0B">
                        <i class="bi bi-calendar-check-fill fs-4"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${ptToday}</div>
                        <div class="stat-label">Lịch PT hôm nay</div>
                        <div class="stat-change neutral"><i class="bi bi-dash"></i> Bằng hôm qua</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#FEF2F2;color:#EF4444">
                        <i class="bi bi-tools fs-4"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-value">${incidents}</div>
                        <div class="stat-label">Sự cố thiết bị</div>
                        <div class="stat-change negative"><i class="bi bi-arrow-up"></i> Đang xử lý</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="row g-3 mb-4">
            <div class="col-12">
                <div class="card p-3">
                    <h6 class="mb-3 fw-semibold text-muted text-uppercase" style="font-size:11px;letter-spacing:.05em">Thao tác nhanh</h6>
                    <div class="d-flex gap-3 flex-wrap">
                        <button class="btn btn-outline-primary d-flex align-items-center gap-2" onclick="GF.navigate('receptionist-members')">
                            <i class="bi bi-person-plus fs-5"></i>
                            <div class="text-start">
                                <div class="fw-semibold" style="font-size:13px">Thêm hội viên</div>
                                <div class="text-muted" style="font-size:11px">Tạo hồ sơ mới</div>
                            </div>
                        </button>
                        <button class="btn btn-outline-success d-flex align-items-center gap-2" onclick="GF.navigate('receptionist-checkin')">
                            <i class="bi bi-qr-code-scan fs-5"></i>
                            <div class="text-start">
                                <div class="fw-semibold" style="font-size:13px">Check-in nhanh</div>
                                <div class="text-muted" style="font-size:11px">Quét QR / nhập thủ công</div>
                            </div>
                        </button>
                        <button class="btn btn-outline-warning d-flex align-items-center gap-2" onclick="GF.navigate('receptionist-pt-schedule')">
                            <i class="bi bi-calendar-plus fs-5"></i>
                            <div class="text-start">
                                <div class="fw-semibold" style="font-size:13px">Đặt lịch PT</div>
                                <div class="text-muted" style="font-size:11px">Lên lịch cho hội viên</div>
                            </div>
                        </button>
                        <button class="btn btn-outline-danger d-flex align-items-center gap-2" onclick="GF.navigate('receptionist-report-issue')">
                            <i class="bi bi-exclamation-triangle fs-5"></i>
                            <div class="text-start">
                                <div class="fw-semibold" style="font-size:13px">Báo sự cố</div>
                                <div class="text-muted" style="font-size:11px">Thiết bị hỏng / sự cố</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-3">
            <!-- Recent Check-ins -->
            <div class="col-lg-7">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0 fw-semibold">Check-in gần đây</h6>
                        <button class="btn btn-sm btn-link text-primary p-0" onclick="GF.navigate('receptionist-checkin')">Xem tất cả <i class="bi bi-arrow-right"></i></button>
                    </div>
                    <div class="card-body p-0">
                        <table class="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Hội viên</th>
                                    <th>Mã</th>
                                    <th>Giờ</th>
                                    <th>Phương thức</th>
                                    <th>Kết quả</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${mockCheckins.map(c => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            ${GF.renderAvatar(c.member, 32)}
                                            <span class="fw-medium">${c.member}</span>
                                        </div>
                                    </td>
                                    <td><code class="text-muted">${c.memberId}</code></td>
                                    <td><span class="fw-semibold">${c.time}</span></td>
                                    <td><span class="badge bg-light text-dark">${c.method}</span></td>
                                    <td>
                                        ${c.status === 'success'
                                            ? '<span class="badge" style="background:#F0FDF4;color:#10B981"><i class="bi bi-check-circle me-1"></i>Hợp lệ</span>'
                                            : '<span class="badge" style="background:#FEF2F2;color:#EF4444"><i class="bi bi-x-circle me-1"></i>Từ chối</span>'
                                        }
                                    </td>
                                </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- PT Schedule Today -->
            <div class="col-lg-5">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0 fw-semibold">Lịch PT hôm nay</h6>
                        <button class="btn btn-sm btn-link text-primary p-0" onclick="GF.navigate('receptionist-pt-schedule')">Chi tiết <i class="bi bi-arrow-right"></i></button>
                    </div>
                    <div class="card-body">
                        <div class="d-flex flex-column gap-3">
                            ${upcomingPT.map(s => `
                            <div class="d-flex gap-3 align-items-start p-3 rounded-3" style="background:#F8FAFC;border-left:3px solid ${s.status === 'confirmed' ? '#10B981' : '#F59E0B'}">
                                <div class="fw-bold" style="min-width:48px;color:#2563EB;font-size:14px">${s.time}</div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold" style="font-size:13px">${s.member}</div>
                                    <div class="text-muted" style="font-size:12px">PT: ${s.pt} · ${s.room}</div>
                                </div>
                                <span class="badge" style="background:${s.status === 'confirmed' ? '#F0FDF4' : '#FFF7ED'};color:${s.status === 'confirmed' ? '#10B981' : '#F59E0B'};font-size:10px">
                                    ${s.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ duyệt'}
                                </span>
                            </div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// ─── receptionist-members ─────────────────────────────────────
GF.screens['receptionist-members'] = function(params) {
    const members = GFData.members || [];
    let filtered = [...members];
    let searchVal = '';
    let statusFilter = '';

    function render() {
        const list = filtered.map(m => `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        ${GF.renderAvatar(m.name, 36)}
                        <div>
                            <div class="fw-semibold">${m.name}</div>
                            <div class="text-muted" style="font-size:12px">${m.email || ''}</div>
                        </div>
                    </div>
                </td>
                <td><code>${m.id}</code></td>
                <td>${m.phone || '–'}</td>
                <td>${m.package || 'Chưa có gói'}</td>
                <td>${m.joinDate ? GF.fmt.date(m.joinDate) : '–'}</td>
                <td>${m.expiryDate ? GF.fmt.date(m.expiryDate) : '–'}</td>
                <td>${GF.renderBadge(m.status)}</td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-outline-primary" onclick="GF.navigate('admin-member-detail',{id:'${m.id}'})"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="GF.navigate('admin-member-form',{id:'${m.id}'})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-success" onclick="GF.navigate('receptionist-checkin',{memberId:'${m.id}'})"><i class="bi bi-qr-code-scan"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        const tbody = document.getElementById('recv-members-tbody');
        if (tbody) tbody.innerHTML = list || `<tr><td colspan="8">${GF.renderEmptyState({icon:'bi-people',title:'Không có hội viên',message:'Chưa có hội viên nào phù hợp.'})}</td></tr>`;
        const count = document.getElementById('recv-members-count');
        if (count) count.textContent = `${filtered.length} hội viên`;
    }

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Hội Viên</h1>
                <p class="page-subtitle text-muted">Quản lý danh sách hội viên</p>
            </div>
            <button class="btn btn-primary" onclick="GF.navigate('admin-member-form')">
                <i class="bi bi-person-plus me-2"></i>Thêm hội viên
            </button>
        </div>

        <div class="card mb-3 p-3">
            <div class="row g-2 align-items-end">
                <div class="col-md-5">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" id="recv-search" placeholder="Tìm theo tên, mã, SĐT, email…">
                    </div>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="recv-status-filter">
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="expired">Hết hạn</option>
                        <option value="suspended">Tạm ngưng</option>
                        <option value="reserved">Bảo lưu</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <span id="recv-members-count" class="text-muted">${members.length} hội viên</span>
                </div>
            </div>
        </div>

        <div class="card p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Hội viên</th>
                            <th>Mã</th>
                            <th>SĐT</th>
                            <th>Gói tập</th>
                            <th>Ngày tham gia</th>
                            <th>Hết hạn</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="recv-members-tbody"></tbody>
                </table>
            </div>
        </div>
    `;

    render();

    document.getElementById('recv-search').addEventListener('input', function() {
        searchVal = this.value.toLowerCase();
        filtered = members.filter(m =>
            (m.name || '').toLowerCase().includes(searchVal) ||
            (m.id || '').toLowerCase().includes(searchVal) ||
            (m.phone || '').includes(searchVal) ||
            (m.email || '').toLowerCase().includes(searchVal)
        );
        if (statusFilter) filtered = filtered.filter(m => m.status === statusFilter);
        render();
    });

    document.getElementById('recv-status-filter').addEventListener('change', function() {
        statusFilter = this.value;
        const sv = searchVal;
        filtered = members.filter(m =>
            ((m.name || '').toLowerCase().includes(sv) || (m.id || '').toLowerCase().includes(sv) || (m.phone || '').includes(sv))
        );
        if (statusFilter) filtered = filtered.filter(m => m.status === statusFilter);
        render();
    });
};

// ─── receptionist-checkin ─────────────────────────────────────
GF.screens['receptionist-checkin'] = function(params) {
    const members = GFData.members || [];
    let activeTab = 'qr';
    let scanResult = null;
    let checkLog = [
        { time: '11:30', name: 'Nguyễn Thị Lan', id: 'MV006', result: 'granted', reason: '' },
        { time: '11:12', name: 'Bùi Minh Tuấn', id: 'MV009', result: 'granted', reason: '' },
        { time: '10:55', name: 'Vũ Thị Hoa', id: 'MV008', result: 'denied', reason: 'Gói tập đã hết hạn' },
        { time: '10:30', name: 'Đinh Văn Giang', id: 'MV007', result: 'granted', reason: '' },
        { time: '10:02', name: 'Ngô Thị Phương', id: 'MV006', result: 'granted', reason: '' },
        { time: '09:45', name: 'Hoàng Văn Em', id: 'MV005', result: 'granted', reason: '' },
        { time: '09:18', name: 'Phạm Thị Dung', id: 'MV004', result: 'denied', reason: 'Tài khoản đang bảo lưu' },
        { time: '09:01', name: 'Lê Minh Cường', id: 'MV003', result: 'granted', reason: '' },
        { time: '08:32', name: 'Trần Thị Bình', id: 'MV002', result: 'granted', reason: '' },
        { time: '08:15', name: 'Nguyễn Văn An', id: 'MV001', result: 'granted', reason: '' },
    ];

    function checkMember(idOrName) {
        const q = (idOrName || '').toLowerCase().trim();
        if (!q) return null;
        const found = members.find(m =>
            (m.id || '').toLowerCase() === q ||
            (m.name || '').toLowerCase().includes(q) ||
            (m.phone || '').includes(q)
        );
        if (!found) return { result: 'denied', reason: 'Mã không hợp lệ hoặc không tìm thấy hội viên', member: null };
        if (found.status === 'suspended') return { result: 'denied', reason: 'Tài khoản đang bị tạm ngưng', member: found };
        if (found.status === 'reserved') return { result: 'denied', reason: 'Tài khoản đang trong thời gian bảo lưu', member: found };
        if (found.status === 'expired') return { result: 'denied', reason: 'Gói tập đã hết hạn – vui lòng gia hạn', member: found };
        if (found.status === 'unpaid') return { result: 'denied', reason: 'Chưa thanh toán phí tháng này', member: found };
        return { result: 'granted', reason: '', member: found };
    }

    function renderResult() {
        const box = document.getElementById('checkin-result-box');
        if (!scanResult) { if (box) box.innerHTML = ''; return; }
        const { result, reason, member } = scanResult;
        if (result === 'granted') {
            const daysLeft = member && member.daysLeft !== undefined ? member.daysLeft : 28;
            box.innerHTML = `
                <div class="checkin-result granted p-4 rounded-4 text-center mb-4 position-relative overflow-hidden">
                    <div class="result-bg-anim"></div>
                    <div class="mb-3">
                        <div class="result-icon granted-icon mx-auto mb-2">
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <div class="fw-bold text-success" style="font-size:22px;letter-spacing:.05em">ACCESS GRANTED</div>
                    </div>
                    ${GF.renderAvatar(member.name, 64)}
                    <div class="fw-bold mt-2" style="font-size:20px">${member.name}</div>
                    <div class="text-muted mb-3">${member.id}</div>
                    <div class="d-flex justify-content-center gap-4 flex-wrap">
                        <div class="text-center">
                            <div class="fw-semibold" style="font-size:18px;color:#10B981">${daysLeft}</div>
                            <div class="text-muted" style="font-size:12px">Ngày còn lại</div>
                        </div>
                        <div class="text-center">
                            <div class="fw-semibold" style="font-size:18px">${member.package || 'Premium'}</div>
                            <div class="text-muted" style="font-size:12px">Gói tập</div>
                        </div>
                        <div class="text-center">
                            <div class="fw-semibold" style="font-size:18px">${member.ptSessions || 8}</div>
                            <div class="text-muted" style="font-size:12px">Buổi PT còn</div>
                        </div>
                    </div>
                    <div class="mt-3 text-muted" style="font-size:12px">Đã vào lúc ${new Date().toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'})}</div>
                </div>`;
        } else {
            box.innerHTML = `
                <div class="checkin-result denied p-4 rounded-4 text-center mb-4">
                    <div class="result-icon denied-icon mx-auto mb-2">
                        <i class="bi bi-x-lg"></i>
                    </div>
                    <div class="fw-bold text-danger" style="font-size:22px;letter-spacing:.05em">ACCESS DENIED</div>
                    ${member ? `<div class="fw-bold mt-2" style="font-size:18px">${member.name}</div><div class="text-muted">${member.id}</div>` : '<div class="text-muted mt-2">Không tìm thấy hội viên</div>'}
                    <div class="alert alert-danger mt-3 mb-0 d-flex align-items-center gap-2" style="border-radius:12px">
                        <i class="bi bi-exclamation-circle-fill"></i>
                        <span>${reason}</span>
                    </div>
                    ${member ? `<div class="mt-3"><button class="btn btn-outline-primary btn-sm" onclick="GF.navigate('admin-member-detail',{id:'${member.id}'})"><i class="bi bi-person me-1"></i>Xem hồ sơ</button></div>` : ''}
                </div>`;
        }

        // Add to log
        const now = new Date().toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'});
        checkLog.unshift({
            time: now,
            name: member ? member.name : 'Không xác định',
            id: member ? member.id : '–',
            result: result,
            reason: reason
        });
        if (checkLog.length > 10) checkLog.pop();
        renderLog();
    }

    function renderLog() {
        const logEl = document.getElementById('checkin-log');
        if (!logEl) return;
        logEl.innerHTML = checkLog.map(l => `
            <div class="d-flex align-items-center gap-3 py-2 border-bottom">
                <span class="fw-semibold text-muted" style="min-width:40px;font-size:12px">${l.time}</span>
                <i class="bi ${l.result === 'granted' ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}"></i>
                <div class="flex-grow-1">
                    <div class="fw-medium" style="font-size:13px">${l.name}</div>
                    <div class="text-muted" style="font-size:11px">${l.id}${l.reason ? ' · ' + l.reason : ''}</div>
                </div>
            </div>
        `).join('');
    }

    function switchTab(tab) {
        activeTab = tab;
        ['qr','manual','card'].forEach(t => {
            const btn = document.getElementById(`tab-${t}`);
            const pane = document.getElementById(`pane-${t}`);
            if (btn) btn.classList.toggle('active', t === tab);
            if (pane) pane.style.display = t === tab ? 'block' : 'none';
        });
    }

    document.getElementById('main-content').innerHTML = `
        <style>
            .checkin-result.granted { background:linear-gradient(135deg,#F0FDF4,#DCFCE7); border:2px solid #10B981; }
            .checkin-result.denied { background:linear-gradient(135deg,#FEF2F2,#FEE2E2); border:2px solid #EF4444; }
            .result-icon { width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px; }
            .granted-icon { background:#10B981;color:#fff;animation:pulse-green 1.5s infinite; }
            .denied-icon { background:#EF4444;color:#fff; }
            @keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.4)} 50%{box-shadow:0 0 0 16px rgba(16,185,129,0)} }
            .qr-frame { position:relative;width:200px;height:200px;margin:0 auto;background:#0F172A;border-radius:12px;display:flex;align-items:center;justify-content:center; }
            .qr-corner { position:absolute;width:24px;height:24px;border-color:#2563EB;border-style:solid; }
            .qr-corner.tl { top:8px;left:8px;border-width:3px 0 0 3px; }
            .qr-corner.tr { top:8px;right:8px;border-width:3px 3px 0 0; }
            .qr-corner.bl { bottom:8px;left:8px;border-width:0 0 3px 3px; }
            .qr-corner.br { bottom:8px;right:8px;border-width:0 3px 3px 0; }
            .scan-line { position:absolute;left:12px;right:12px;height:2px;background:linear-gradient(90deg,transparent,#2563EB,transparent);animation:scanMove 2s linear infinite; }
            @keyframes scanMove { 0%{top:12px}100%{top:calc(100% - 12px)} }
            .tab-bar { display:flex;gap:0;border-bottom:2px solid #E2E8F0;margin-bottom:20px; }
            .tab-bar button { background:none;border:none;padding:10px 20px;font-weight:500;color:#64748B;border-bottom:3px solid transparent;margin-bottom:-2px;cursor:pointer;transition:all .2s; }
            .tab-bar button.active { color:#2563EB;border-bottom-color:#2563EB; }
        </style>

        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Check-in Hội Viên</h1>
                <p class="page-subtitle text-muted">Kiểm tra và ghi nhận lượt vào tập</p>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card p-4">
                    <!-- Tabs -->
                    <div class="tab-bar">
                        <button id="tab-qr" class="active" onclick="switchTab('qr')"><i class="bi bi-qr-code-scan me-2"></i>Quét QR</button>
                        <button id="tab-manual" onclick="switchTab('manual')"><i class="bi bi-keyboard me-2"></i>Nhập thủ công</button>
                        <button id="tab-card" onclick="switchTab('card')"><i class="bi bi-credit-card-2-front me-2"></i>Kiểm tra mã thẻ</button>
                    </div>

                    <!-- QR Tab -->
                    <div id="pane-qr">
                        <div class="text-center">
                            <div class="qr-frame mb-4">
                                <div class="qr-corner tl"></div>
                                <div class="qr-corner tr"></div>
                                <div class="qr-corner bl"></div>
                                <div class="qr-corner br"></div>
                                <div class="scan-line"></div>
                                <div class="text-center">
                                    <i class="bi bi-camera-fill text-white" style="font-size:40px;opacity:.3"></i>
                                    <div class="text-white mt-2" style="font-size:11px;opacity:.5">Camera đang chờ...</div>
                                </div>
                            </div>
                            <p class="text-muted mb-3">Hướng camera vào mã QR của thẻ hội viên</p>
                            <div class="d-flex gap-2 justify-content-center">
                                <button class="btn btn-primary" onclick="(function(){const r=checkMember('MV006');scanResult=r;renderResult();})()">
                                    <i class="bi bi-lightning-charge me-1"></i> Demo: Kiểm tra MV006
                                </button>
                                <button class="btn btn-outline-danger" onclick="(function(){scanResult={result:'denied',reason:'Gói tập đã hết hạn – vui lòng gia hạn',member:{name:'Phạm Thị Dung',id:'MV004',package:'Basic'}};renderResult();})()">
                                    Demo: Từ chối
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Manual Tab -->
                    <div id="pane-manual" style="display:none">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Tìm hội viên</label>
                            <div class="input-group input-group-lg">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control" id="manual-search" placeholder="Nhập tên, mã hội viên hoặc SĐT…">
                                <button class="btn btn-primary" id="manual-check-btn">Kiểm tra</button>
                            </div>
                        </div>
                        <div id="manual-suggestions" class="border rounded-3 overflow-hidden mb-3" style="display:none;max-height:200px;overflow-y:auto"></div>
                    </div>

                    <!-- Card Tab -->
                    <div id="pane-card" style="display:none">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Mã thẻ hội viên</label>
                            <div class="input-group input-group-lg">
                                <span class="input-group-text"><i class="bi bi-credit-card-2-front"></i></span>
                                <input type="text" class="form-control" id="card-input" placeholder="Quẹt thẻ hoặc nhập mã thẻ…" autofocus>
                                <button class="btn btn-primary" id="card-check-btn">Kiểm tra</button>
                            </div>
                        </div>
                        <p class="text-muted" style="font-size:12px"><i class="bi bi-info-circle me-1"></i>Đặt focus vào ô trên và quẹt thẻ từ để tự động điền mã</p>
                    </div>

                    <!-- Result -->
                    <div id="checkin-result-box"></div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0 fw-semibold"><i class="bi bi-clock-history me-2"></i>Lịch sử check-in hôm nay</h6>
                    </div>
                    <div class="card-body p-3" id="checkin-log" style="max-height:520px;overflow-y:auto"></div>
                </div>
            </div>
        </div>
    `;

    // Expose functions to window for inline usage
    window.checkMember = checkMember;
    window.scanResult = scanResult;
    window.renderResult = renderResult;
    window.switchTab = switchTab;

    renderLog();
    if (params && params.memberId) {
        switchTab('manual');
        const inp = document.getElementById('manual-search');
        if (inp) inp.value = params.memberId;
        scanResult = checkMember(params.memberId);
        renderResult();
    }

    // Manual search
    const manualInput = document.getElementById('manual-search');
    if (manualInput) {
        manualInput.addEventListener('input', function() {
            const q = this.value.toLowerCase().trim();
            const sugg = document.getElementById('manual-suggestions');
            if (!q || q.length < 2) { sugg.style.display = 'none'; return; }
            const results = members.filter(m =>
                (m.name||'').toLowerCase().includes(q) ||
                (m.id||'').toLowerCase().includes(q) ||
                (m.phone||'').includes(q)
            ).slice(0, 6);
            if (results.length === 0) { sugg.style.display = 'none'; return; }
            sugg.style.display = 'block';
            sugg.innerHTML = results.map(m => `
                <div class="d-flex align-items-center gap-3 p-3 border-bottom suggestion-item" style="cursor:pointer" onclick="
                    document.getElementById('manual-search').value='${m.id}';
                    document.getElementById('manual-suggestions').style.display='none';
                    scanResult=checkMember('${m.id}');
                    renderResult();
                ">
                    ${GF.renderAvatar(m.name, 32)}
                    <div>
                        <div class="fw-medium">${m.name}</div>
                        <div class="text-muted" style="font-size:12px">${m.id} · ${m.phone||''} · ${GF.renderBadge(m.status)}</div>
                    </div>
                </div>
            `).join('');
        });
    }

    const manualBtn = document.getElementById('manual-check-btn');
    if (manualBtn) {
        manualBtn.addEventListener('click', function() {
            const val = document.getElementById('manual-search').value;
            scanResult = checkMember(val);
            window.scanResult = scanResult;
            renderResult();
        });
    }

    const cardBtn = document.getElementById('card-check-btn');
    if (cardBtn) {
        cardBtn.addEventListener('click', function() {
            const val = document.getElementById('card-input').value;
            scanResult = checkMember(val);
            window.scanResult = scanResult;
            renderResult();
        });
    }

    const cardInput = document.getElementById('card-input');
    if (cardInput) {
        cardInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                scanResult = checkMember(this.value);
                window.scanResult = scanResult;
                renderResult();
            }
        });
    }
};

// ─── receptionist-pt-schedule ────────────────────────────────
GF.screens['receptionist-pt-schedule'] = function(params) {
    const sessions = [
        { id: 'PS001', member: 'Trần Văn Bảo', memberId: 'MV002', pt: 'Phạm Minh Tuấn', ptId: 'NV005', date: '2026-07-14', time: '13:00', room: 'Phòng PT 1', status: 'confirmed' },
        { id: 'PS002', member: 'Lê Thị Cẩm', memberId: 'MV003', pt: 'Nguyễn Thị Hương', ptId: 'NV006', date: '2026-07-14', time: '14:30', room: 'Phòng PT 2', status: 'confirmed' },
        { id: 'PS003', member: 'Hoàng Văn Đức', memberId: 'MV007', pt: 'Trần Quang Minh', ptId: 'NV007', date: '2026-07-14', time: '15:00', room: 'Phòng PT 1', status: 'pending' },
        { id: 'PS004', member: 'Phạm Thị Mai', memberId: 'MV008', pt: 'Phạm Minh Tuấn', ptId: 'NV005', date: '2026-07-14', time: '16:00', room: 'Phòng PT 3', status: 'confirmed' },
        { id: 'PS005', member: 'Vũ Minh Long', memberId: 'MV009', pt: 'Nguyễn Thị Hương', ptId: 'NV006', date: '2026-07-15', time: '09:00', room: 'Phòng PT 2', status: 'confirmed' },
    ];

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Lịch PT</h1>
                <p class="page-subtitle text-muted">Quản lý lịch tập với huấn luyện viên</p>
            </div>
            <button class="btn btn-primary" onclick="document.getElementById('book-pt-modal-area').style.display='block'">
                <i class="bi bi-calendar-plus me-2"></i>Đặt lịch PT
            </button>
        </div>

        <div class="card p-0">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0 fw-semibold">Danh sách lịch PT</h6>
                <span class="badge bg-primary">${sessions.length} buổi</span>
            </div>
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Hội viên</th>
                            <th>Huấn luyện viên</th>
                            <th>Ngày</th>
                            <th>Giờ</th>
                            <th>Phòng</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sessions.map(s => `
                        <tr>
                            <td><code>${s.id}</code></td>
                            <td>
                                <div class="d-flex align-items-center gap-2">
                                    ${GF.renderAvatar(s.member, 32)}
                                    <span class="fw-medium">${s.member}</span>
                                </div>
                            </td>
                            <td>${s.pt}</td>
                            <td>${GF.fmt.date(s.date)}</td>
                            <td><span class="fw-semibold">${s.time}</span></td>
                            <td>${s.room}</td>
                            <td>${GF.renderBadge(s.status)}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-danger" onclick="GF.modal.confirm({title:'Hủy lịch PT',message:'Bạn có chắc muốn hủy buổi PT này?',confirmText:'Hủy lịch',type:'danger',onConfirm:function(){GF.toast.success('Đã hủy lịch PT '+' ${s.id}');}})">
                                    <i class="bi bi-x-circle"></i> Hủy
                                </button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <div id="book-pt-modal-area" style="display:none" class="mt-4">
            <div class="card p-4">
                <h5 class="fw-semibold mb-3">Đặt lịch PT mới</h5>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Hội viên</label>
                        <select class="form-select">
                            <option>-- Chọn hội viên --</option>
                            <option>Nguyễn Thị Lan (MV006)</option>
                            <option>Trần Văn Bảo (MV002)</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Huấn luyện viên</label>
                        <select class="form-select">
                            <option>-- Chọn PT --</option>
                            <option>Phạm Minh Tuấn</option>
                            <option>Nguyễn Thị Hương</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Ngày</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Giờ</label>
                        <input type="time" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Phòng</label>
                        <select class="form-select">
                            <option>Phòng PT 1</option>
                            <option>Phòng PT 2</option>
                            <option>Phòng PT 3</option>
                        </select>
                    </div>
                    <div class="col-12 d-flex gap-2">
                        <button class="btn btn-primary" onclick="GF.toast.success('Đã đặt lịch PT thành công!');document.getElementById('book-pt-modal-area').style.display='none'">
                            <i class="bi bi-check-lg me-1"></i>Xác nhận đặt lịch
                        </button>
                        <button class="btn btn-outline-secondary" onclick="document.getElementById('book-pt-modal-area').style.display='none'">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// ─── receptionist-report-issue ────────────────────────────────
GF.screens['receptionist-report-issue'] = function(params) {
    const equipment = GFData.equipment || [
        {id:'TB001',name:'Máy chạy bộ #1'},
        {id:'TB002',name:'Máy chạy bộ #2'},
        {id:'TB003',name:'Xe đạp tập #1'},
        {id:'TB004',name:'Tạ đơn 20kg'},
        {id:'TB005',name:'Máy ép ngực'},
    ];

    const reported = [
        { id: 'SI001', equipment: 'Máy chạy bộ #1', desc: 'Màn hình bị nhấp nháy, không hiển thị tốc độ', severity: 'medium', date: '2026-07-13', status: 'processing', reporter: 'Nguyễn Văn Khánh' },
        { id: 'SI002', equipment: 'Xe đạp tập #1', desc: 'Yên xe bị lỏng, kêu khi đạp', severity: 'low', date: '2026-07-12', status: 'resolved', reporter: 'Trần Thị Mai' },
        { id: 'SI003', equipment: 'Máy ép ngực', desc: 'Dây cáp bị sờn, nguy cơ đứt cao', severity: 'high', date: '2026-07-11', status: 'processing', reporter: 'Lê Văn Tuấn' },
        { id: 'SI004', equipment: 'Tạ đơn 20kg', desc: 'Chân đế bị nứt, không an toàn', severity: 'high', date: '2026-07-10', status: 'pending', reporter: 'Phạm Thị Hoa' },
        { id: 'SI005', equipment: 'Máy chạy bộ #2', desc: 'Tiếng ồn bất thường khi chạy nhanh', severity: 'medium', date: '2026-07-09', status: 'resolved', reporter: 'Hoàng Văn An' },
    ];

    const sevColor = { low: '#10B981', medium: '#F59E0B', high: '#EF4444' };
    const sevLabel = { low: 'Nhẹ', medium: 'Trung bình', high: 'Nghiêm trọng' };
    const statusMap = { pending: 'Chờ xử lý', processing: 'Đang xử lý', resolved: 'Đã giải quyết' };
    const statusColor = { pending: '#F59E0B', processing: '#2563EB', resolved: '#10B981' };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Báo Sự Cố Thiết Bị</h1>
                <p class="page-subtitle text-muted">Ghi nhận và theo dõi sự cố thiết bị phòng gym</p>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-6">
                <div class="card p-4">
                    <h5 class="fw-semibold mb-4"><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>Báo sự cố mới</h5>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Thiết bị <span class="text-danger">*</span></label>
                        <select class="form-select" id="issue-equipment">
                            <option value="">-- Chọn thiết bị --</option>
                            ${equipment.map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Mô tả sự cố <span class="text-danger">*</span></label>
                        <textarea class="form-control" rows="4" id="issue-desc" placeholder="Mô tả chi tiết vấn đề gặp phải…"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Mức độ nghiêm trọng</label>
                        <div class="d-flex gap-3">
                            <label class="d-flex align-items-center gap-2 p-3 rounded-3 border flex-fill" style="cursor:pointer" id="sev-low">
                                <input type="radio" name="severity" value="low"> 
                                <div>
                                    <div class="fw-semibold text-success">Nhẹ</div>
                                    <div class="text-muted" style="font-size:11px">Không ảnh hưởng vận hành</div>
                                </div>
                            </label>
                            <label class="d-flex align-items-center gap-2 p-3 rounded-3 border flex-fill" style="cursor:pointer" id="sev-medium">
                                <input type="radio" name="severity" value="medium" checked>
                                <div>
                                    <div class="fw-semibold text-warning">Trung bình</div>
                                    <div class="text-muted" style="font-size:11px">Ảnh hưởng một phần</div>
                                </div>
                            </label>
                            <label class="d-flex align-items-center gap-2 p-3 rounded-3 border flex-fill" style="cursor:pointer" id="sev-high">
                                <input type="radio" name="severity" value="high">
                                <div>
                                    <div class="fw-semibold text-danger">Nghiêm trọng</div>
                                    <div class="text-muted" style="font-size:11px">Cần xử lý ngay</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="form-label fw-semibold">Hình ảnh đính kèm</label>
                        <div class="border border-dashed rounded-3 p-4 text-center" style="cursor:pointer;background:#F8FAFC" onclick="GF.toast.info('Chọn ảnh từ máy tính')">
                            <i class="bi bi-cloud-arrow-up fs-2 text-muted mb-2"></i>
                            <div class="text-muted">Kéo thả hoặc <span class="text-primary fw-semibold">chọn file</span></div>
                            <div class="text-muted" style="font-size:12px">PNG, JPG tối đa 5MB</div>
                        </div>
                    </div>
                    <button class="btn btn-danger w-100 py-2" onclick="
                        const eq = document.getElementById('issue-equipment').value;
                        const desc = document.getElementById('issue-desc').value;
                        if(!eq||!desc){GF.toast.error('Vui lòng điền đầy đủ thông tin!');return;}
                        GF.toast.success('Đã gửi báo cáo sự cố thành công!');
                        document.getElementById('issue-equipment').value='';
                        document.getElementById('issue-desc').value='';
                    ">
                        <i class="bi bi-send-fill me-2"></i>Gửi báo cáo sự cố
                    </button>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0 fw-semibold">Sự cố đã báo cáo</h6>
                        <span class="badge bg-primary">${reported.length}</span>
                    </div>
                    <div class="card-body p-0">
                        ${reported.map(r => `
                        <div class="p-3 border-bottom">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <span class="fw-semibold">${r.equipment}</span>
                                    <span class="ms-2 badge" style="background:${sevColor[r.severity]}22;color:${sevColor[r.severity]}">${sevLabel[r.severity]}</span>
                                </div>
                                <span class="badge" style="background:${statusColor[r.status]}22;color:${statusColor[r.status]}">${statusMap[r.status]}</span>
                            </div>
                            <p class="text-muted mb-1" style="font-size:13px">${r.desc}</p>
                            <div class="d-flex gap-3 text-muted" style="font-size:11px">
                                <span><i class="bi bi-person me-1"></i>${r.reporter}</span>
                                <span><i class="bi bi-calendar me-1"></i>${GF.fmt.date(r.date)}</span>
                                <span><i class="bi bi-hash me-1"></i>${r.id}</span>
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
};
