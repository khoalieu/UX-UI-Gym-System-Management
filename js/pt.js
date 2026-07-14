// ============================================================
// pt.js – Màn hình dành cho Huấn luyện viên PT (NV005 – Phạm Minh Tuấn)
// ============================================================

const PT_ID = 'NV005';
const PT_NAME = 'Phạm Minh Tuấn';

// ─── pt-dashboard ────────────────────────────────────────────
GF.screens['pt-dashboard'] = function(params) {
    const today = new Date().toISOString().slice(0, 10);
    const todayTimeline = [
        { time: '08:00', member: 'Nguyễn Thị Lan', duration: '60 phút', status: 'completed', room: 'Phòng PT 1', goal: 'Giảm mỡ bụng' },
        { time: '09:30', member: 'Trần Văn Bảo', duration: '60 phút', status: 'completed', room: 'Phòng PT 1', goal: 'Tăng cơ vai' },
        { time: '13:00', member: 'Lê Minh Cường', duration: '60 phút', status: 'upcoming', room: 'Phòng PT 1', goal: 'Phục hồi chấn thương' },
        { time: '15:00', member: 'Phạm Thị Mai', duration: '60 phút', status: 'upcoming', room: 'Phòng PT 3', goal: 'Yoga & Linh hoạt' },
        { time: '17:00', member: 'Hoàng Văn Đức', duration: '60 phút', status: 'upcoming', room: 'Phòng PT 1', goal: 'Cardio & Sức bền' },
    ];

    const recentActivity = [
        { date: '14/07', member: 'Nguyễn Thị Lan', type: 'Buổi tập', note: 'Hoàn thành tốt, cải thiện rõ', status: 'completed' },
        { date: '14/07', member: 'Trần Văn Bảo', type: 'Buổi tập', note: 'Đạt mục tiêu cân nặng', status: 'completed' },
        { date: '13/07', member: 'Vũ Minh Long', type: 'Yêu cầu', note: 'Đã chấp nhận yêu cầu đặt lịch', status: 'approved' },
        { date: '12/07', member: 'Đinh Thị Hạnh', type: 'Lộ trình', note: 'Cập nhật lộ trình tuần 6', status: 'updated' },
    ];

    const statusTimelineColor = { completed: '#10B981', upcoming: '#2563EB', cancelled: '#EF4444' };
    const statusTimelineLabel = { completed: 'Hoàn thành', upcoming: 'Sắp tới', cancelled: 'Đã hủy' };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Dashboard PT</h1>
                <p class="page-subtitle text-muted">Xin chào, <strong>${PT_NAME}</strong> – ${GF.fmt.date(new Date().toISOString())}</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary" onclick="GF.navigate('pt-bookings')">
                    <i class="bi bi-bell me-1"></i> Yêu cầu đặt lịch
                </button>
                <button class="btn btn-primary" onclick="GF.navigate('pt-schedule')">
                    <i class="bi bi-calendar3 me-1"></i> Lịch của tôi
                </button>
            </div>
        </div>

        <!-- Stats -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#EFF6FF;color:#2563EB"><i class="bi bi-calendar-check-fill fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">5</div>
                        <div class="stat-label">Buổi tập hôm nay</div>
                        <div class="stat-change positive"><i class="bi bi-check-circle"></i> 2 đã hoàn thành</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#F0FDF4;color:#10B981"><i class="bi bi-people-fill fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Hội viên phụ trách</div>
                        <div class="stat-change neutral">Đang hoạt động</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#FFF7ED;color:#F59E0B"><i class="bi bi-hourglass-split fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">3</div>
                        <div class="stat-label">Yêu cầu chờ duyệt</div>
                        <div class="stat-change negative"><i class="bi bi-dot"></i> Cần xử lý</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#F5F3FF;color:#8B5CF6"><i class="bi bi-wallet2 fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">${GF.fmt.currency(14400000)}</div>
                        <div class="stat-label">Thu nhập tháng này</div>
                        <div class="stat-change positive"><i class="bi bi-arrow-up"></i> 36 buổi xác nhận</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Today Timeline -->
            <div class="col-lg-7">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h6 class="mb-0 fw-semibold">Lịch hôm nay</h6>
                        <span class="badge bg-primary">${todayTimeline.length} buổi</span>
                    </div>
                    <div class="timeline">
                        ${todayTimeline.map((s, i) => `
                        <div class="d-flex gap-3 mb-4 position-relative">
                            <div class="d-flex flex-column align-items-center" style="min-width:60px">
                                <div class="fw-bold" style="color:#2563EB;font-size:14px">${s.time}</div>
                                ${i < todayTimeline.length - 1 ? '<div style="width:2px;flex:1;background:#E2E8F0;margin-top:4px;min-height:30px"></div>' : ''}
                            </div>
                            <div class="flex-grow-1 p-3 rounded-3 ${s.status === 'completed' ? 'border border-success' : 'border border-primary'}" style="background:${s.status === 'completed' ? '#F0FDF4' : '#EFF6FF'}">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div class="fw-semibold">${s.member}</div>
                                        <div class="text-muted" style="font-size:12px">${s.goal} · ${s.room} · ${s.duration}</div>
                                    </div>
                                    <span class="badge" style="background:${statusTimelineColor[s.status]}22;color:${statusTimelineColor[s.status]}">${statusTimelineLabel[s.status]}</span>
                                </div>
                                ${s.status === 'upcoming' ? `<button class="btn btn-sm btn-success mt-2" onclick="GF.toast.success('Đã đánh dấu hoàn thành buổi tập với ${s.member}!')"><i class="bi bi-check-lg me-1"></i>Đánh dấu hoàn thành</button>` : ''}
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="col-lg-5">
                <div class="card p-4">
                    <h6 class="mb-3 fw-semibold">Hoạt động gần đây</h6>
                    <div class="d-flex flex-column gap-3">
                        ${recentActivity.map(a => `
                        <div class="d-flex gap-3 align-items-start">
                            <div class="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width:36px;height:36px;background:#EFF6FF;color:#2563EB">
                                <i class="bi ${a.type === 'Buổi tập' ? 'bi-lightning-charge' : a.type === 'Yêu cầu' ? 'bi-calendar-plus' : 'bi-map'} fs-6"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold" style="font-size:13px">${a.member}</div>
                                <div class="text-muted" style="font-size:12px">${a.note}</div>
                            </div>
                            <span class="text-muted" style="font-size:11px;white-space:nowrap">${a.date}</span>
                        </div>`).join('')}
                    </div>
                </div>

                <div class="card p-4 mt-3">
                    <h6 class="mb-3 fw-semibold">Yêu cầu chờ duyệt</h6>
                    ${[
                        { member: 'Bùi Thị Thanh', time: '15/07 – 10:00', goal: 'Giảm cân' },
                        { member: 'Ngô Văn Kiên', time: '16/07 – 14:30', goal: 'Tăng cơ' },
                        { member: 'Trần Minh Nhật', time: '17/07 – 09:00', goal: 'Phục hồi' },
                    ].map(r => `
                    <div class="d-flex align-items-center gap-3 mb-3">
                        ${GF.renderAvatar(r.member, 36)}
                        <div class="flex-grow-1">
                            <div class="fw-semibold" style="font-size:13px">${r.member}</div>
                            <div class="text-muted" style="font-size:11px">${r.time} · ${r.goal}</div>
                        </div>
                        <div class="d-flex gap-1">
                            <button class="btn btn-xs btn-success" style="padding:3px 8px;font-size:11px" onclick="GF.toast.success('Đã chấp nhận!')"><i class="bi bi-check-lg"></i></button>
                            <button class="btn btn-xs btn-outline-danger" style="padding:3px 8px;font-size:11px" onclick="GF.toast.warning('Đã từ chối!')"><i class="bi bi-x-lg"></i></button>
                        </div>
                    </div>`).join('')}
                    <button class="btn btn-sm btn-outline-primary w-100" onclick="GF.navigate('pt-bookings')">Xem tất cả yêu cầu</button>
                </div>
            </div>
        </div>
    `;
};

// ─── pt-schedule ─────────────────────────────────────────────
GF.screens['pt-schedule'] = function(params) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });

    // Days with sessions
    const sessionDays = [2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28];
    const weekSessions = [
        { date: '14/07 T2', time: '08:00', member: 'Nguyễn Thị Lan', status: 'completed', goal: 'Giảm mỡ' },
        { date: '14/07 T2', time: '09:30', member: 'Trần Văn Bảo', status: 'completed', goal: 'Tăng cơ vai' },
        { date: '14/07 T2', time: '13:00', member: 'Lê Minh Cường', status: 'confirmed', goal: 'Phục hồi' },
        { date: '15/07 T3', time: '09:00', member: 'Phạm Thị Mai', status: 'confirmed', goal: 'Yoga' },
        { date: '15/07 T3', time: '15:00', member: 'Vũ Minh Long', status: 'confirmed', goal: 'Sức bền' },
        { date: '16/07 T4', time: '08:00', member: 'Đinh Thị Hạnh', status: 'pending', goal: 'Tăng cơ' },
        { date: '16/07 T4', time: '14:00', member: 'Hoàng Văn Đức', status: 'confirmed', goal: 'Cardio' },
    ];

    const statusColor = { completed: '#10B981', confirmed: '#2563EB', pending: '#F59E0B', cancelled: '#EF4444' };
    const statusLabel = { completed: 'Hoàn thành', confirmed: 'Đã xác nhận', pending: 'Chờ duyệt', cancelled: 'Đã hủy' };

    // Build calendar
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();
    const calCells = [];
    for (let i = 0; i < firstDay; i++) calCells.push('');
    for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Lịch Của Tôi</h1>
                <p class="page-subtitle text-muted">Quản lý lịch tập trong tháng</p>
            </div>
        </div>

        <div class="row g-4">
            <!-- Calendar -->
            <div class="col-lg-5">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left"></i></button>
                        <h6 class="mb-0 fw-semibold text-capitalize">${monthName}</h6>
                        <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-right"></i></button>
                    </div>
                    <div class="calendar-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
                        ${['CN','T2','T3','T4','T5','T6','T7'].map(d => `<div class="text-center fw-semibold text-muted py-1" style="font-size:11px">${d}</div>`).join('')}
                        ${calCells.map(d => {
                            if (!d) return '<div></div>';
                            const hasSession = sessionDays.includes(d);
                            const isToday = d === today;
                            return `<div class="text-center py-1 rounded-2 position-relative ${isToday ? 'bg-primary text-white' : hasSession ? 'fw-semibold' : 'text-muted'}" style="cursor:pointer;font-size:13px;${hasSession && !isToday ? 'color:#2563EB' : ''}">
                                ${d}
                                ${hasSession && !isToday ? '<div style="width:4px;height:4px;background:#2563EB;border-radius:50%;margin:0 auto;margin-top:-2px"></div>' : ''}
                            </div>`;
                        }).join('')}
                    </div>
                    <div class="mt-3 d-flex gap-3 flex-wrap">
                        <div class="d-flex align-items-center gap-1"><div style="width:10px;height:10px;background:#2563EB;border-radius:50%"></div><span style="font-size:11px">Có buổi tập</span></div>
                        <div class="d-flex align-items-center gap-1"><div style="width:10px;height:10px;background:#2563EB;border-radius:2px"></div><span style="font-size:11px">Hôm nay</span></div>
                    </div>
                </div>
            </div>

            <!-- Week sessions -->
            <div class="col-lg-7">
                <div class="card p-4">
                    <h6 class="fw-semibold mb-3">Buổi tập trong tuần (14–20/07)</h6>
                    <div class="d-flex flex-column gap-2">
                        ${weekSessions.map(s => `
                        <div class="d-flex align-items-center gap-3 p-3 rounded-3 border" style="border-left:3px solid ${statusColor[s.status]}!important">
                            <div style="min-width:70px">
                                <div class="fw-semibold" style="font-size:12px;color:#64748B">${s.date}</div>
                                <div class="fw-bold" style="color:#2563EB">${s.time}</div>
                            </div>
                            ${GF.renderAvatar(s.member, 36)}
                            <div class="flex-grow-1">
                                <div class="fw-semibold" style="font-size:13px">${s.member}</div>
                                <div class="text-muted" style="font-size:11px">${s.goal}</div>
                            </div>
                            <span class="badge" style="background:${statusColor[s.status]}22;color:${statusColor[s.status]};font-size:10px">${statusLabel[s.status]}</span>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
};

// ─── pt-bookings ─────────────────────────────────────────────
GF.screens['pt-bookings'] = function(params) {
    let activeTab = 'all';
    const bookings = [
        { id: 'BK001', member: 'Bùi Thị Thanh', memberId: 'MV010', date: '2026-07-15', time: '10:00', goal: 'Giảm cân, tăng độ dẻo dai', status: 'pending', note: 'Mới tập lần đầu, cần hướng dẫn cơ bản' },
        { id: 'BK002', member: 'Ngô Văn Kiên', memberId: 'MV011', date: '2026-07-16', time: '14:30', goal: 'Tăng cơ bắp tay và vai', status: 'pending', note: 'Đã có kinh nghiệm 2 năm' },
        { id: 'BK003', member: 'Trần Minh Nhật', memberId: 'MV012', date: '2026-07-17', time: '09:00', goal: 'Phục hồi sau chấn thương đầu gối', status: 'pending', note: 'Cần lưu ý chấn thương cũ' },
        { id: 'BK004', member: 'Nguyễn Thị Lan', memberId: 'MV006', date: '2026-07-18', time: '08:00', goal: 'Giảm mỡ bụng', status: 'approved', note: '' },
        { id: 'BK005', member: 'Lê Văn Toàn', memberId: 'MV013', date: '2026-07-12', time: '15:00', goal: 'Sức bền và cardio', status: 'rejected', note: 'Lịch đầy', rejectReason: 'PT đã kín lịch vào thời điểm này' },
        { id: 'BK006', member: 'Phạm Minh Quân', memberId: 'MV014', date: '2026-07-19', time: '11:00', goal: 'Yoga và thiền', status: 'approved', note: '' },
    ];

    const statusColor = { pending: '#F59E0B', approved: '#10B981', rejected: '#EF4444' };
    const statusLabel = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Đã từ chối' };

    function render() {
        const list = bookings.filter(b => activeTab === 'all' || b.status === activeTab);
        const container = document.getElementById('bookings-list');
        if (!container) return;
        if (list.length === 0) {
            container.innerHTML = GF.renderEmptyState({ icon: 'bi-calendar2-x', title: 'Không có yêu cầu', message: 'Không có yêu cầu nào trong danh mục này.' });
            return;
        }
        container.innerHTML = list.map(b => `
            <div class="card mb-3 p-4">
                <div class="d-flex align-items-start gap-4">
                    ${GF.renderAvatar(b.member, 48)}
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <div class="fw-bold" style="font-size:16px">${b.member}</div>
                                <div class="text-muted" style="font-size:12px">${b.memberId}</div>
                            </div>
                            <span class="badge" style="background:${statusColor[b.status]}22;color:${statusColor[b.status]}">${statusLabel[b.status]}</span>
                        </div>
                        <div class="row g-2 mb-2">
                            <div class="col-md-4"><span class="text-muted" style="font-size:12px"><i class="bi bi-calendar me-1"></i></span><strong>${GF.fmt.date(b.date)}</strong></div>
                            <div class="col-md-3"><span class="text-muted" style="font-size:12px"><i class="bi bi-clock me-1"></i></span><strong>${b.time}</strong></div>
                        </div>
                        <div class="mb-2"><span class="text-muted" style="font-size:12px">Mục tiêu: </span>${b.goal}</div>
                        ${b.note ? `<div class="mb-2 p-2 rounded-2" style="background:#FFF7ED;font-size:12px"><i class="bi bi-info-circle text-warning me-1"></i>${b.note}</div>` : ''}
                        ${b.rejectReason ? `<div class="mb-2 p-2 rounded-2" style="background:#FEF2F2;font-size:12px"><i class="bi bi-x-circle text-danger me-1"></i>Lý do từ chối: ${b.rejectReason}</div>` : ''}
                        ${b.status === 'pending' ? `
                        <div class="d-flex gap-2 mt-3">
                            <button class="btn btn-success" onclick="approveBooking('${b.id}')"><i class="bi bi-check-lg me-1"></i>Chấp nhận</button>
                            <button class="btn btn-outline-danger" onclick="rejectBooking('${b.id}','${b.member}')"><i class="bi bi-x-lg me-1"></i>Từ chối</button>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function switchTab(tab) {
        activeTab = tab;
        ['all','pending','approved','rejected'].forEach(t => {
            const btn = document.getElementById(`bk-tab-${t}`);
            if (btn) btn.classList.toggle('active', t === tab);
        });
        render();
    }

    document.getElementById('main-content').innerHTML = `
        <style>
            .bk-tabs { display:flex;gap:0;border-bottom:2px solid #E2E8F0;margin-bottom:20px; }
            .bk-tabs button { background:none;border:none;padding:10px 20px;font-weight:500;color:#64748B;border-bottom:3px solid transparent;margin-bottom:-2px;cursor:pointer;transition:all .2s; }
            .bk-tabs button.active { color:#2563EB;border-bottom-color:#2563EB; }
        </style>
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Yêu Cầu Đặt Lịch</h1>
                <p class="page-subtitle text-muted">Xem xét và phê duyệt yêu cầu từ hội viên</p>
            </div>
            <span class="badge bg-warning text-dark fs-6">${bookings.filter(b=>b.status==='pending').length} yêu cầu chờ duyệt</span>
        </div>
        <div class="bk-tabs">
            <button id="bk-tab-all" class="active" onclick="switchTab('all')">Tất cả (${bookings.length})</button>
            <button id="bk-tab-pending" onclick="switchTab('pending')">Chờ duyệt (${bookings.filter(b=>b.status==='pending').length})</button>
            <button id="bk-tab-approved" onclick="switchTab('approved')">Đã duyệt (${bookings.filter(b=>b.status==='approved').length})</button>
            <button id="bk-tab-rejected" onclick="switchTab('rejected')">Đã từ chối (${bookings.filter(b=>b.status==='rejected').length})</button>
        </div>
        <div id="bookings-list"></div>
    `;

    window.switchTab = switchTab;
    window.approveBooking = function(id) {
        const b = bookings.find(x => x.id === id);
        if (b) { b.status = 'approved'; GF.toast.success('Đã chấp nhận yêu cầu đặt lịch!'); render(); }
    };
    window.rejectBooking = function(id, memberName) {
        GF.modal.show(`
            <div class="p-4">
                <h5 class="fw-bold mb-3 text-danger"><i class="bi bi-x-circle me-2"></i>Từ chối yêu cầu</h5>
                <p class="text-muted mb-3">Từ chối yêu cầu đặt lịch của <strong>${memberName}</strong></p>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Lý do từ chối <span class="text-danger">*</span></label>
                    <textarea class="form-control" id="reject-reason" rows="3" placeholder="Nhập lý do từ chối…"></textarea>
                </div>
                <div class="d-flex gap-2 justify-content-end">
                    <button class="btn btn-outline-secondary" onclick="GF.modal.hide()">Hủy</button>
                    <button class="btn btn-danger" onclick="
                        const reason = document.getElementById('reject-reason').value;
                        if(!reason){GF.toast.error('Vui lòng nhập lý do!');return;}
                        const b = bookings.find(x=>x.id==='${id}');
                        if(b){b.status='rejected';b.rejectReason=reason;}
                        GF.modal.hide();
                        GF.toast.success('Đã từ chối yêu cầu!');
                        render();
                    ">Xác nhận từ chối</button>
                </div>
            </div>
        `);
    };

    render();
};

// ─── pt-members ──────────────────────────────────────────────
GF.screens['pt-members'] = function(params) {
    const myMembers = [
        { id: 'MV001', name: 'Nguyễn Văn An', phone: '0912345678', package: 'Premium', sessionsLeft: 8, totalSessions: 20, lastSession: '2026-07-12', progress: 60 },
        { id: 'MV002', name: 'Trần Thị Bình', phone: '0923456789', package: 'VIP', sessionsLeft: 5, totalSessions: 15, lastSession: '2026-07-13', progress: 67 },
        { id: 'MV003', name: 'Lê Minh Cường', phone: '0934567890', package: 'Basic', sessionsLeft: 12, totalSessions: 20, lastSession: '2026-07-10', progress: 40 },
        { id: 'MV006', name: 'Nguyễn Thị Lan', phone: '0967890123', package: 'Premium', sessionsLeft: 3, totalSessions: 20, lastSession: '2026-07-14', progress: 85 },
        { id: 'MV007', name: 'Hoàng Văn Đức', phone: '0978901234', package: 'VIP', sessionsLeft: 10, totalSessions: 20, lastSession: '2026-07-11', progress: 50 },
        { id: 'MV008', name: 'Phạm Thị Mai', phone: '0989012345', package: 'Premium', sessionsLeft: 7, totalSessions: 15, lastSession: '2026-07-14', progress: 53 },
    ];

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Hội Viên Phụ Trách</h1>
                <p class="page-subtitle text-muted">Danh sách hội viên của ${PT_NAME}</p>
            </div>
            <span class="badge bg-primary fs-6">${myMembers.length} hội viên</span>
        </div>

        <div class="card p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr><th>Hội viên</th><th>SĐT</th><th>Gói</th><th>Buổi còn lại</th><th>Buổi cuối</th><th>Tiến độ lộ trình</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        ${myMembers.map(m => `
                        <tr>
                            <td>
                                <div class="d-flex align-items-center gap-2">
                                    ${GF.renderAvatar(m.name, 36)}
                                    <div>
                                        <div class="fw-semibold">${m.name}</div>
                                        <div class="text-muted" style="font-size:12px">${m.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${m.phone}</td>
                            <td><span class="badge bg-light text-dark">${m.package}</span></td>
                            <td>
                                <span class="fw-semibold ${m.sessionsLeft <= 3 ? 'text-danger' : 'text-success'}">${m.sessionsLeft}</span>
                                <span class="text-muted"> / ${m.totalSessions}</span>
                            </td>
                            <td>${GF.fmt.date(m.lastSession)}</td>
                            <td style="min-width:140px">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="progress flex-grow-1" style="height:6px">
                                        <div class="progress-bar" style="width:${m.progress}%;background:${m.progress >= 80 ? '#10B981' : m.progress >= 50 ? '#2563EB' : '#F59E0B'}"></div>
                                    </div>
                                    <span style="font-size:12px;min-width:32px">${m.progress}%</span>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex gap-1">
                                    <button class="btn btn-sm btn-outline-primary" onclick="GF.navigate('admin-member-detail',{id:'${m.id}'})"><i class="bi bi-person"></i></button>
                                    <button class="btn btn-sm btn-outline-success" onclick="GF.navigate('pt-roadmap',{memberId:'${m.id}'})"><i class="bi bi-map"></i></button>
                                </div>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

// ─── pt-roadmap ──────────────────────────────────────────────
GF.screens['pt-roadmap'] = function(params) {
    const memberId = (params && params.memberId) || 'MV006';
    const memberName = memberId === 'MV006' ? 'Nguyễn Thị Lan' : 'Hội viên';
    const weeks = [
        { week: 1, title: 'Khởi động & Đánh giá', goal: 'Đánh giá thể lực ban đầu, làm quen bài tập', exercises: ['Đi bộ 30 phút', 'Squat 3x10', 'Push-up 3x8', 'Plank 30s'], status: 'completed' },
        { week: 2, title: 'Tăng cường nền tảng', goal: 'Xây dựng thói quen tập luyện', exercises: ['Chạy bộ 20 phút', 'Deadlift 3x8', 'Bench Press 3x10', 'Pull-up 3x6'], status: 'completed' },
        { week: 3, title: 'Cardio cường độ cao', goal: 'Đốt mỡ và tăng sức bền', exercises: ['HIIT 25 phút', 'Burpee 3x15', 'Jump Rope 10 phút', 'Mountain Climber 3x20'], status: 'completed' },
        { week: 4, title: 'Sức mạnh tổng hợp', goal: 'Phát triển cơ toàn thân', exercises: ['Squat nặng 4x6', 'Romanian Deadlift 3x8', 'Shoulder Press 3x10', 'Cable Row 3x12'], status: 'completed' },
        { week: 5, title: 'Định hình cơ', goal: 'Tăng tone cơ, giảm mỡ', exercises: ['Circuit Training 30 phút', 'Lunge 3x12 mỗi bên', 'Tricep Dips 3x15', 'Lateral Raise 3x15'], status: 'completed' },
        { week: 6, title: 'Đỉnh cao sức mạnh', goal: 'Thách thức giới hạn', exercises: ['Powerlifting set', 'Overhead Squat 3x5', 'Weighted Pull-up 3x5', 'Heavy Press 4x5'], status: 'in-progress' },
        { week: 7, title: 'Phục hồi chủ động', goal: 'Tái tạo cơ bắp', exercises: ['Yoga 45 phút', 'Foam Rolling', 'Light Swimming', 'Stretching 30 phút'], status: 'upcoming' },
        { week: 8, title: 'Sức bền nâng cao', goal: 'Tăng khả năng chịu đựng', exercises: ['Chạy dài 8km', 'Bike 45 phút', 'Rowing 20 phút', 'Kettlebell Circuit'], status: 'upcoming' },
        { week: 9, title: 'Tổng hợp & Kiểm tra', goal: 'Kiểm tra tiến bộ, điều chỉnh', exercises: ['Fitness Test', 'Max Lift Test', 'Cardio Benchmark', 'Flexibility Test'], status: 'upcoming' },
        { week: 10, title: 'Chuyên biệt hóa', goal: 'Tập trung vào điểm yếu', exercises: ['Tập trung cơ vùng yếu', 'Bổ sung bài tập mới', 'Tăng tải trọng', 'Siêu bù'], status: 'upcoming' },
        { week: 11, title: 'Đỉnh cao hiệu suất', goal: 'Đạt hiệu suất tốt nhất', exercises: ['Peak Week Training', 'Optimize Recovery', 'Nutrition Adjustment', 'Sleep Protocol'], status: 'upcoming' },
        { week: 12, title: 'Đánh giá tổng kết', goal: 'So sánh kết quả ban đầu và hiện tại', exercises: ['Final Fitness Test', 'Body Composition', 'Progress Photos', 'Planning Next Phase'], status: 'upcoming' },
    ];

    const statusMap = { completed: { color: '#10B981', icon: 'bi-check-circle-fill', label: 'Hoàn thành' }, 'in-progress': { color: '#2563EB', icon: 'bi-play-circle-fill', label: 'Đang thực hiện' }, upcoming: { color: '#94A3B8', icon: 'bi-circle', label: 'Sắp tới' } };
    const members = ['MV001 – Nguyễn Văn An', 'MV002 – Trần Thị Bình', 'MV006 – Nguyễn Thị Lan', 'MV007 – Hoàng Văn Đức'];

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Lộ Trình Tập Luyện</h1>
                <p class="page-subtitle text-muted">Chương trình 12 tuần cá nhân hóa</p>
            </div>
            <button class="btn btn-primary" onclick="GF.toast.success('Đã lưu lộ trình!')">
                <i class="bi bi-save me-2"></i>Lưu lộ trình
            </button>
        </div>

        <div class="card p-3 mb-4">
            <div class="row align-items-center g-3">
                <div class="col-md-4">
                    <label class="form-label fw-semibold mb-1">Hội viên</label>
                    <select class="form-select" onchange="GF.navigate('pt-roadmap',{memberId:this.value.split(' ')[0]})">
                        ${members.map(m => `<option ${m.startsWith(memberId) ? 'selected' : ''}>${m}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-4">
                    <div class="text-muted" style="font-size:12px">Hội viên đã chọn</div>
                    <div class="fw-bold">${memberName}</div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex gap-3">
                        <div class="text-center">
                            <div class="fw-bold text-success">${weeks.filter(w=>w.status==='completed').length}</div>
                            <div class="text-muted" style="font-size:11px">Hoàn thành</div>
                        </div>
                        <div class="text-center">
                            <div class="fw-bold text-primary">${weeks.filter(w=>w.status==='in-progress').length}</div>
                            <div class="text-muted" style="font-size:11px">Đang thực hiện</div>
                        </div>
                        <div class="text-center">
                            <div class="fw-bold text-muted">${weeks.filter(w=>w.status==='upcoming').length}</div>
                            <div class="text-muted" style="font-size:11px">Sắp tới</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Progress bar -->
        <div class="card p-3 mb-4">
            <div class="d-flex justify-content-between mb-2">
                <span class="fw-semibold">Tiến độ tổng thể</span>
                <span class="fw-bold text-primary">Tuần ${weeks.findIndex(w=>w.status!=='completed')+1}/12</span>
            </div>
            <div class="progress" style="height:12px;border-radius:8px">
                <div class="progress-bar" style="width:${Math.round(weeks.filter(w=>w.status==='completed').length/12*100)}%;background:linear-gradient(90deg,#2563EB,#10B981);border-radius:8px"></div>
            </div>
        </div>

        <!-- Timeline -->
        <div class="d-flex flex-column gap-3">
            ${weeks.map(w => {
                const s = statusMap[w.status];
                return `
                <div class="card p-4 ${w.status === 'in-progress' ? 'border-primary' : ''}">
                    <div class="d-flex align-items-start gap-4">
                        <div class="d-flex flex-column align-items-center" style="min-width:60px">
                            <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width:40px;height:40px;background:${s.color}22;color:${s.color}">
                                ${w.week}
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <div class="fw-bold">${w.title}</div>
                                    <div class="text-muted" style="font-size:13px">${w.goal}</div>
                                </div>
                                <span class="badge" style="background:${s.color}22;color:${s.color}">${s.label}</span>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                                ${w.exercises.map(e => `<span class="badge bg-light text-dark" style="font-weight:normal">${e}</span>`).join('')}
                            </div>
                            ${w.status !== 'upcoming' ? `
                            <div class="mt-2">
                                <textarea class="form-control form-control-sm" rows="1" placeholder="Ghi chú cho tuần này…" style="border-radius:8px"></textarea>
                            </div>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('')}
        </div>
    `;
};

// ─── pt-confirm-session ──────────────────────────────────────
GF.screens['pt-confirm-session'] = function(params) {
    const sessions = [
        { id: 'PS001', member: 'Nguyễn Thị Lan', memberId: 'MV006', date: '2026-07-12', time: '08:00', duration: '60 phút', status: 'pt-completed', goal: 'Giảm mỡ bụng', notes: 'Hội viên thực hiện tốt, cần theo dõi thêm' },
        { id: 'PS002', member: 'Trần Văn Bảo', memberId: 'MV002', date: '2026-07-12', time: '09:30', duration: '60 phút', status: 'confirmed', goal: 'Tăng cơ vai', notes: 'Tăng 2kg so với tuần trước' },
        { id: 'PS003', member: 'Lê Minh Cường', memberId: 'MV003', date: '2026-07-13', time: '13:00', duration: '60 phút', status: 'pt-completed', goal: 'Phục hồi chấn thương', notes: 'Cần nghỉ ngơi thêm 2 ngày' },
        { id: 'PS004', member: 'Phạm Thị Mai', memberId: 'MV008', date: '2026-07-13', time: '15:00', duration: '60 phút', status: 'confirmed', goal: 'Yoga & Linh hoạt', notes: '' },
    ];

    const statusMap = {
        'pt-completed': { label: 'PT đã xác nhận – Chờ HV', color: '#F59E0B', icon: 'bi-hourglass-split' },
        'confirmed': { label: 'HV đã xác nhận', color: '#10B981', icon: 'bi-check-circle-fill' },
        'pending': { label: 'Chờ xử lý', color: '#94A3B8', icon: 'bi-clock' }
    };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Xác Nhận Buổi Tập</h1>
                <p class="page-subtitle text-muted">Buổi đã hoàn thành – chờ hội viên xác nhận để tính lương</p>
            </div>
        </div>
        <div class="alert alert-info d-flex align-items-center gap-2 mb-4">
            <i class="bi bi-info-circle-fill"></i>
            <span>Chỉ những buổi tập có <strong>hội viên xác nhận</strong> mới được tính vào lương của PT. Vui lòng nhắc hội viên xác nhận sau mỗi buổi tập.</span>
        </div>
        <div class="row g-3">
            ${sessions.map(s => {
                const st = statusMap[s.status] || statusMap.pending;
                return `
                <div class="col-md-6">
                    <div class="card p-4">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center gap-3">
                                ${GF.renderAvatar(s.member, 44)}
                                <div>
                                    <div class="fw-bold">${s.member}</div>
                                    <div class="text-muted" style="font-size:12px">${s.memberId}</div>
                                </div>
                            </div>
                            <span class="badge" style="background:${st.color}22;color:${st.color}"><i class="bi ${st.icon} me-1"></i>${st.label}</span>
                        </div>
                        <div class="mb-2 d-flex gap-4">
                            <div><i class="bi bi-calendar text-muted me-1"></i><span style="font-size:13px">${GF.fmt.date(s.date)}</span></div>
                            <div><i class="bi bi-clock text-muted me-1"></i><span style="font-size:13px">${s.time}</span></div>
                            <div><i class="bi bi-stopwatch text-muted me-1"></i><span style="font-size:13px">${s.duration}</span></div>
                        </div>
                        <div class="mb-2"><span class="text-muted" style="font-size:12px">Mục tiêu: </span><span style="font-size:13px">${s.goal}</span></div>
                        ${s.notes ? `<div class="p-2 rounded-2 mb-2" style="background:#F8FAFC;font-size:12px"><i class="bi bi-chat-left-text text-muted me-1"></i>${s.notes}</div>` : ''}
                        <div class="mt-2 pt-2 border-top d-flex gap-2">
                            ${s.status === 'pt-completed' ? `<span class="text-warning" style="font-size:12px"><i class="bi bi-hourglass me-1"></i>Đang chờ hội viên xác nhận…</span>` : `<span class="text-success" style="font-size:12px"><i class="bi bi-check-circle-fill me-1"></i>Hội viên đã xác nhận – Tính vào lương</span>`}
                        </div>
                        <div class="pt-1 text-muted" style="font-size:11px">Mã buổi: ${s.id}</div>
                    </div>
                </div>`;
            }).join('')}
        </div>
    `;
};

// ─── pt-salary ───────────────────────────────────────────────
GF.screens['pt-salary'] = function(params) {
    const sessions = [
        { id: 'PS002', member: 'Trần Văn Bảo', date: '2026-07-12', confirmed: true, ratePerSession: 400000 },
        { id: 'PS004', member: 'Phạm Thị Mai', date: '2026-07-13', confirmed: true, ratePerSession: 400000 },
        { id: 'PS006', member: 'Hoàng Văn Đức', date: '2026-07-10', confirmed: true, ratePerSession: 400000 },
        { id: 'PS007', member: 'Nguyễn Thị Lan', date: '2026-07-09', confirmed: true, ratePerSession: 400000 },
        { id: 'PS008', member: 'Lê Minh Cường', date: '2026-07-08', confirmed: true, ratePerSession: 400000 },
        { id: 'PS009', member: 'Bùi Thị Thanh', date: '2026-07-07', confirmed: false, ratePerSession: 400000 },
    ];

    const confirmedSessions = sessions.filter(s => s.confirmed);
    const totalSessions = sessions.length;
    const totalSalary = confirmedSessions.reduce((sum, s) => sum + s.ratePerSession, 0);
    const ratePerSession = 400000;

    // 6-month chart data
    const months = ['Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'];
    const earnings = [12000000, 14800000, 13200000, 15600000, 16400000, totalSalary];
    const maxEarning = Math.max(...earnings);

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Lương Của Tôi</h1>
                <p class="page-subtitle text-muted">Tháng 7/2026 – ${PT_NAME}</p>
            </div>
        </div>

        <!-- Summary -->
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <div class="card p-4 text-center" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE)">
                    <div class="fw-bold text-primary mb-1" style="font-size:32px">${confirmedSessions.length}</div>
                    <div class="text-muted mb-1">Buổi đã xác nhận</div>
                    <div class="text-muted" style="font-size:12px">Tổng ${totalSessions} buổi hoàn thành</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center" style="background:linear-gradient(135deg,#F0FDF4,#DCFCE7)">
                    <div class="fw-bold text-success mb-1" style="font-size:32px">${GF.fmt.currency(ratePerSession)}</div>
                    <div class="text-muted mb-1">Lương / buổi</div>
                    <div class="text-muted" style="font-size:12px">Mức lương hiện tại</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center" style="background:linear-gradient(135deg,#F5F3FF,#EDE9FE)">
                    <div class="fw-bold mb-1" style="font-size:32px;color:#8B5CF6">${GF.fmt.currency(totalSalary)}</div>
                    <div class="text-muted mb-1">Tổng lương tháng 7</div>
                    <div class="text-muted" style="font-size:12px">Đã tính thuế TNCN</div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Salary detail table -->
            <div class="col-lg-7">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0 fw-semibold">Chi tiết buổi tính lương</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead>
                                <tr><th>Mã buổi</th><th>Hội viên</th><th>Ngày</th><th>Mức lương</th><th>Trạng thái</th></tr>
                            </thead>
                            <tbody>
                                ${sessions.map(s => `
                                <tr>
                                    <td><code>${s.id}</code></td>
                                    <td>
                                        <div class="d-flex align-items-center gap-2">
                                            ${GF.renderAvatar(s.member, 28)}
                                            <span>${s.member}</span>
                                        </div>
                                    </td>
                                    <td>${GF.fmt.date(s.date)}</td>
                                    <td class="fw-semibold ${s.confirmed ? 'text-success' : 'text-muted'}">${s.confirmed ? GF.fmt.currency(s.ratePerSession) : '–'}</td>
                                    <td>
                                        ${s.confirmed
                                            ? '<span class="badge" style="background:#F0FDF4;color:#10B981"><i class="bi bi-check-circle-fill me-1"></i>Đã xác nhận</span>'
                                            : '<span class="badge" style="background:#FFF7ED;color:#F59E0B"><i class="bi bi-hourglass me-1"></i>Chờ HV xác nhận</span>'}
                                    </td>
                                </tr>`).join('')}
                                <tr class="table-light fw-bold border-top">
                                    <td colspan="3">Tổng cộng (${confirmedSessions.length} buổi xác nhận)</td>
                                    <td class="text-success">${GF.fmt.currency(totalSalary)}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- 6-month chart -->
            <div class="col-lg-5">
                <div class="card p-4">
                    <h6 class="mb-4 fw-semibold">Thu nhập 6 tháng gần nhất</h6>
                    <div class="d-flex align-items-end gap-2" style="height:160px">
                        ${months.map((m, i) => `
                        <div class="flex-fill d-flex flex-column align-items-center gap-1">
                            <span style="font-size:9px;color:#64748B;writing-mode:horizontal-tb">${(earnings[i]/1000000).toFixed(1)}M</span>
                            <div style="width:100%;height:${Math.round((earnings[i]/maxEarning)*130)}px;background:${i===months.length-1?'linear-gradient(180deg,#8B5CF6,#C4B5FD)':'linear-gradient(180deg,#2563EB,#93C5FD)'};border-radius:4px 4px 0 0;min-height:8px"></div>
                            <span style="font-size:10px;color:#64748B">${m.replace('Tháng ','T')}</span>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
};
