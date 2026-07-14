// ============================================================
// cashier.js – Màn hình dành cho Thu Ngân (Cashier)
// ============================================================

// ─── cashier-dashboard ───────────────────────────────────────
GF.screens['cashier-dashboard'] = function(params) {
    const today = new Date().toISOString().slice(0, 10);
    const payments = GFData.payments || [];
    const todayPayments = payments.filter(p => p.date && p.date.startsWith(today));
    const revenueToday = todayPayments.reduce((s, p) => s + (p.amount || 0), 0) || 8750000;
    const txCount = todayPayments.length || 6;
    const pending = payments.filter(p => p.status === 'pending').length || 3;
    const refunded = payments.filter(p => p.status === 'refunded').length || 1;

    const last7 = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString('vi-VN', {weekday:'short', day:'numeric'});
        const amount = Math.floor(Math.random() * 15000000) + 3000000;
        last7.push({ label, amount });
    }
    const maxAmt = Math.max(...last7.map(d => d.amount));

    const recentTx = [
        { id: 'HD001', member: 'Nguyễn Thị Lan', package: 'Premium 3 tháng', amount: 2850000, method: 'Chuyển khoản', status: 'completed', date: '2026-07-14' },
        { id: 'HD002', member: 'Trần Văn Bảo', package: 'Basic 1 tháng', amount: 650000, method: 'Tiền mặt', status: 'completed', date: '2026-07-14' },
        { id: 'HD003', member: 'Lê Minh Cường', package: 'VIP 6 tháng', amount: 7200000, method: 'VNPay', status: 'completed', date: '2026-07-14' },
        { id: 'HD004', member: 'Phạm Thị Mai', package: 'PT Package 10 buổi', amount: 3500000, method: 'Thẻ ngân hàng', status: 'pending', date: '2026-07-14' },
        { id: 'HD005', member: 'Hoàng Văn Đức', package: 'Premium 1 tháng', amount: 1200000, method: 'VNPay', status: 'refunded', date: '2026-07-13' },
    ];

    const statusColor = { completed: '#10B981', pending: '#F59E0B', refunded: '#64748B', failed: '#EF4444' };
    const statusLabel = { completed: 'Hoàn thành', pending: 'Chờ xử lý', refunded: 'Hoàn tiền', failed: 'Thất bại' };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Dashboard Tài Chính</h1>
                <p class="page-subtitle text-muted">Tổng quan thu chi hôm nay – ${GF.fmt.date(new Date().toISOString())}</p>
            </div>
            <button class="btn btn-primary" onclick="GF.navigate('cashier-create-payment')">
                <i class="bi bi-plus-circle me-2"></i>Tạo thanh toán
            </button>
        </div>

        <!-- Stats -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#EFF6FF;color:#2563EB"><i class="bi bi-cash-stack fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">${GF.fmt.currency(revenueToday)}</div>
                        <div class="stat-label">Doanh thu hôm nay</div>
                        <div class="stat-change positive"><i class="bi bi-arrow-up"></i> +12% so với hôm qua</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#F0FDF4;color:#10B981"><i class="bi bi-receipt fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">${txCount}</div>
                        <div class="stat-label">Giao dịch hôm nay</div>
                        <div class="stat-change neutral">Từ đầu ngày</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#FFF7ED;color:#F59E0B"><i class="bi bi-hourglass-split fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">${pending}</div>
                        <div class="stat-label">Chờ xử lý</div>
                        <div class="stat-change negative"><i class="bi bi-dot"></i> Cần xử lý</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon" style="background:#F8FAFC;color:#64748B"><i class="bi bi-arrow-counterclockwise fs-4"></i></div>
                    <div class="stat-info">
                        <div class="stat-value">${refunded}</div>
                        <div class="stat-label">Đã hoàn tiền</div>
                        <div class="stat-change neutral">Hôm nay</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Revenue Chart -->
            <div class="col-lg-7">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h6 class="mb-0 fw-semibold">Doanh thu 7 ngày qua</h6>
                        <span class="text-muted" style="font-size:12px">Đơn vị: VND</span>
                    </div>
                    <div class="d-flex align-items-end gap-2" style="height:180px">
                        ${last7.map(d => `
                        <div class="flex-fill d-flex flex-column align-items-center gap-1">
                            <span style="font-size:10px;color:#64748B">${GF.fmt.currency(d.amount).replace('₫','').trim()}</span>
                            <div style="width:100%;height:${Math.round((d.amount/maxAmt)*150)}px;background:linear-gradient(180deg,#2563EB,#60A5FA);border-radius:6px 6px 0 0;min-height:8px"></div>
                            <span style="font-size:10px;color:#64748B">${d.label}</span>
                        </div>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Quick actions & summary -->
            <div class="col-lg-5">
                <div class="card p-4 mb-3">
                    <h6 class="fw-semibold mb-3">Thao tác nhanh</h6>
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-primary d-flex align-items-center gap-2" onclick="GF.navigate('cashier-create-payment')">
                            <i class="bi bi-plus-circle-fill"></i> Tạo thanh toán mới
                        </button>
                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2" onclick="GF.navigate('cashier-payments')">
                            <i class="bi bi-list-ul"></i> Danh sách thanh toán
                        </button>
                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2" onclick="GF.navigate('cashier-history')">
                            <i class="bi bi-clock-history"></i> Lịch sử giao dịch
                        </button>
                    </div>
                </div>
                <div class="card p-4">
                    <h6 class="fw-semibold mb-3">Phân bổ phương thức</h6>
                    ${[
                        { label: 'Tiền mặt', pct: 35, color: '#10B981' },
                        { label: 'Chuyển khoản', pct: 28, color: '#2563EB' },
                        { label: 'VNPay', pct: 25, color: '#8B5CF6' },
                        { label: 'Thẻ ngân hàng', pct: 12, color: '#F59E0B' },
                    ].map(m => `
                    <div class="mb-2">
                        <div class="d-flex justify-content-between mb-1">
                            <span style="font-size:13px">${m.label}</span>
                            <span class="fw-semibold" style="font-size:13px">${m.pct}%</span>
                        </div>
                        <div class="progress" style="height:6px;border-radius:4px">
                            <div class="progress-bar" style="width:${m.pct}%;background:${m.color};border-radius:4px"></div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card mt-4">
            <div class="card-header d-flex justify-content-between">
                <h6 class="mb-0 fw-semibold">Giao dịch gần đây</h6>
                <button class="btn btn-sm btn-link text-primary p-0" onclick="GF.navigate('cashier-payments')">Xem tất cả <i class="bi bi-arrow-right"></i></button>
            </div>
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead><tr><th>Mã HĐ</th><th>Hội viên</th><th>Gói tập</th><th>Số tiền</th><th>Phương thức</th><th>Trạng thái</th><th>Ngày</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        ${recentTx.map(t => `
                        <tr>
                            <td><a href="#" class="fw-semibold text-primary" onclick="GF.navigate('cashier-invoice',{id:'${t.id}'})">${t.id}</a></td>
                            <td>${GF.renderAvatar(t.member, 28)} <span class="ms-2">${t.member}</span></td>
                            <td>${t.package}</td>
                            <td class="fw-bold" style="color:#2563EB">${GF.fmt.currency(t.amount)}</td>
                            <td>${t.method}</td>
                            <td><span class="badge" style="background:${statusColor[t.status]}22;color:${statusColor[t.status]}">${statusLabel[t.status]}</span></td>
                            <td>${GF.fmt.date(t.date)}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="GF.navigate('cashier-invoice',{id:'${t.id}'})"><i class="bi bi-receipt"></i></button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

GF.screens['cashier-packages']=function(){document.getElementById('main-content').innerHTML=`${GF.screenHeader('Danh mục gói tập','Thông tin giá bán dành cho nghiệp vụ thu ngân')}<div class="alert alert-info mb-4"><i class="bi bi-info-circle me-2"></i>Thu ngân chỉ được xem và chọn gói khi tạo thanh toán, không có quyền chỉnh sửa danh mục.</div><div class="packages-grid">${GFData.packages.map(p=>`<article class="package-card ${p.popular?'popular':''}">${p.popular?'<span class="package-popular-badge">Bán chạy</span>':''}<div class="package-card-icon" style="background:${p.color}18;color:${p.color}"><i class="bi bi-box-seam"></i></div><h3 class="package-card-name">${p.name}</h3><div class="package-card-price"><span class="package-price-amount">${GF.fmt.currency(p.price).replace('₫','')}</span></div><p class="package-card-duration">Thời hạn ${p.duration}</p><ul class="package-features">${p.features.map(x=>`<li class="package-feature-item"><i class="bi bi-check-circle-fill"></i>${x}</li>`).join('')}</ul><button class="btn btn-primary w-full" onclick="GF.navigate('cashier-create-payment',{packageId:'${p.id}'})">Tạo thanh toán gói này</button></article>`).join('')}</div>`};
GF.screens['cashier-reports']=function(){const rows=[['Tiền mặt',12,7850000,'42,7%'],['Chuyển khoản',8,5320000,'28,9%'],['VNPay',5,3850000,'20,9%'],['Thẻ ngân hàng',2,1380000,'7,5%']];document.getElementById('main-content').innerHTML=`${GF.screenHeader('Báo cáo thu ngân','Tổng hợp giao dịch trong ca làm việc hôm nay','<button class="btn btn-outline-secondary" onclick="GF.toast.success(\'Đã xuất báo cáo ca\')"><i class="bi bi-download"></i>Xuất báo cáo ca</button>')}<div class="row g-3 mb-4"><div class="col-md-3">${GF.stat('bi-cash-stack','#10b981','18,4 tr','Tổng thu trong ca','27 giao dịch')}</div><div class="col-md-3">${GF.stat('bi-receipt','#2563eb','26','Thành công','Tỷ lệ 96,3%')}</div><div class="col-md-3">${GF.stat('bi-x-circle','#ef4444','1','Thất bại','VNPay timeout')}</div><div class="col-md-3">${GF.stat('bi-arrow-counterclockwise','#f59e0b','0','Hoàn tiền','Trong ca hiện tại')}</div></div><div class="card"><div class="card-header"><h5>Doanh thu theo phương thức</h5><span class="badge bg-success-subtle text-success">Ca 07:00 – 15:00</span></div><div class="table-responsive"><table class="table"><thead><tr><th>Phương thức</th><th>Số giao dịch</th><th>Doanh thu</th><th>Tỷ trọng</th></tr></thead><tbody>${rows.map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td><td class="text-blue fw-bold">${GF.fmt.currency(x[2])}</td><td>${x[3]}</td></tr>`).join('')}</tbody></table></div></div>`};

// ─── cashier-payments ────────────────────────────────────────
GF.screens['cashier-payments'] = function(params) {
    const allPayments = [
        { id: 'HD001', member: 'Nguyễn Thị Lan', memberId:'MV006', package: 'Premium 3 tháng', amount: 2850000, method: 'Chuyển khoản', status: 'completed', date: '2026-07-14' },
        { id: 'HD002', member: 'Trần Văn Bảo', memberId:'MV002', package: 'Basic 1 tháng', amount: 650000, method: 'Tiền mặt', status: 'completed', date: '2026-07-14' },
        { id: 'HD003', member: 'Lê Minh Cường', memberId:'MV003', package: 'VIP 6 tháng', amount: 7200000, method: 'VNPay', status: 'completed', date: '2026-07-14' },
        { id: 'HD004', member: 'Phạm Thị Mai', memberId:'MV008', package: 'PT Package 10 buổi', amount: 3500000, method: 'Thẻ ngân hàng', status: 'pending', date: '2026-07-14' },
        { id: 'HD005', member: 'Hoàng Văn Đức', memberId:'MV007', package: 'Premium 1 tháng', amount: 1200000, method: 'VNPay', status: 'refunded', date: '2026-07-13' },
        { id: 'HD006', member: 'Vũ Thị Hoa', memberId:'MV008', package: 'Basic 3 tháng', amount: 1500000, method: 'Tiền mặt', status: 'completed', date: '2026-07-12' },
        { id: 'HD007', member: 'Bùi Minh Tuấn', memberId:'MV009', package: 'Premium 6 tháng', amount: 5400000, method: 'Chuyển khoản', status: 'completed', date: '2026-07-11' },
        { id: 'HD008', member: 'Đinh Văn Giang', memberId:'MV010', package: 'VIP 1 năm', amount: 9600000, method: 'Thẻ ngân hàng', status: 'completed', date: '2026-07-10' },
    ];

    const statusColor = { completed: '#10B981', pending: '#F59E0B', refunded: '#64748B', failed: '#EF4444', cancelled: '#EF4444' };
    const statusLabel = { completed: 'Hoàn thành', pending: 'Chờ xử lý', refunded: 'Hoàn tiền', failed: 'Thất bại', cancelled: 'Đã hủy' };
    let filtered = [...allPayments];

    function render() {
        const tbody = document.getElementById('cashier-payments-tbody');
        if (!tbody) return;
        tbody.innerHTML = filtered.map(t => `
            <tr>
                <td><a href="#" class="fw-semibold text-primary" onclick="GF.navigate('cashier-invoice',{id:'${t.id}'})">${t.id}</a></td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        ${GF.renderAvatar(t.member, 32)}
                        <div>
                            <div class="fw-medium">${t.member}</div>
                            <div class="text-muted" style="font-size:12px">${t.memberId}</div>
                        </div>
                    </div>
                </td>
                <td>${t.package}</td>
                <td class="fw-bold" style="color:#2563EB;font-size:15px">${GF.fmt.currency(t.amount)}</td>
                <td>${t.method}</td>
                <td><span class="badge" style="background:${statusColor[t.status]}22;color:${statusColor[t.status]}">${statusLabel[t.status]}</span></td>
                <td>${GF.fmt.date(t.date)}</td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-outline-primary" onclick="GF.navigate('cashier-invoice',{id:'${t.id}'})" title="Xem hóa đơn"><i class="bi bi-receipt"></i></button>
                        ${t.status === 'pending' ? `<button class="btn btn-sm btn-outline-danger" onclick="GF.modal.confirm({title:'Hủy giao dịch',message:'Xác nhận hủy giao dịch ${t.id}?',confirmText:'Hủy GD',type:'danger',onConfirm:function(){GF.toast.success('Đã hủy giao dịch ${t.id}')}})" title="Hủy"><i class="bi bi-x-circle"></i></button>` : ''}
                        ${t.status === 'completed' ? `<button class="btn btn-sm btn-outline-warning" onclick="GF.modal.confirm({title:'Hoàn tiền',message:'Xác nhận hoàn tiền cho giao dịch ${t.id}?',confirmText:'Hoàn tiền',type:'warning',onConfirm:function(){GF.toast.success('Đã gửi yêu cầu hoàn tiền!')}})" title="Hoàn tiền"><i class="bi bi-arrow-counterclockwise"></i></button>` : ''}
                    </div>
                </td>
            </tr>`).join('') || '<tr><td colspan="8" class="text-center py-4 text-muted">Không có giao dịch nào</td></tr>';
    }

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Danh Sách Thanh Toán</h1>
                <p class="page-subtitle text-muted">Quản lý giao dịch thanh toán</p>
            </div>
            <button class="btn btn-primary" onclick="GF.navigate('cashier-create-payment')">
                <i class="bi bi-plus-circle me-2"></i>Tạo thanh toán
            </button>
        </div>

        <div class="card mb-3 p-3">
            <div class="row g-2">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" id="pay-search" placeholder="Tìm mã HĐ, hội viên…">
                    </div>
                </div>
                <div class="col-md-2">
                    <input type="date" class="form-control" id="pay-date">
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="pay-method">
                        <option value="">Phương thức</option>
                        <option>Tiền mặt</option>
                        <option>Chuyển khoản</option>
                        <option>Thẻ ngân hàng</option>
                        <option>VNPay</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="pay-status">
                        <option value="">Trạng thái</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="refunded">Hoàn tiền</option>
                        <option value="failed">Thất bại</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-outline-secondary w-100" onclick="document.getElementById('pay-search').value='';document.getElementById('pay-date').value='';document.getElementById('pay-method').value='';document.getElementById('pay-status').value='';filtered=[...allPayments];render()">
                        <i class="bi bi-x-circle me-1"></i>Xóa lọc
                    </button>
                </div>
            </div>
        </div>

        <div class="card p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr><th>Mã HĐ</th><th>Hội viên</th><th>Gói tập</th><th>Số tiền</th><th>Phương thức</th><th>Trạng thái</th><th>Ngày</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody id="cashier-payments-tbody"></tbody>
                </table>
            </div>
        </div>
    `;

    // Expose to window for inline events
    window.allPayments = allPayments;
    window.filtered = filtered;
    window.render = render;

    render();

    ['pay-search','pay-method','pay-status','pay-date'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => {
            const q = document.getElementById('pay-search').value.toLowerCase();
            const method = document.getElementById('pay-method').value;
            const status = document.getElementById('pay-status').value;
            const date = document.getElementById('pay-date').value;
            filtered = allPayments.filter(p =>
                (!q || p.id.toLowerCase().includes(q) || p.member.toLowerCase().includes(q)) &&
                (!method || p.method === method) &&
                (!status || p.status === status) &&
                (!date || p.date === date)
            );
            render();
        });
    });
    document.getElementById('pay-search').addEventListener('input', () => {
        const q = document.getElementById('pay-search').value.toLowerCase();
        const method = document.getElementById('pay-method').value;
        const status = document.getElementById('pay-status').value;
        const date = document.getElementById('pay-date').value;
        filtered = allPayments.filter(p =>
            (!q || p.id.toLowerCase().includes(q) || p.member.toLowerCase().includes(q)) &&
            (!method || p.method === method) &&
            (!status || p.status === status) &&
            (!date || p.date === date)
        );
        render();
    });
};

// ─── cashier-create-payment ──────────────────────────────────
GF.screens['cashier-create-payment'] = function(params) {
    const members = GFData.members || [
        {id:'MV001',name:'Nguyễn Văn An',phone:'0912345678',email:'an@email.com'},
        {id:'MV002',name:'Trần Thị Bình',phone:'0923456789',email:'binh@email.com'},
        {id:'MV006',name:'Nguyễn Thị Lan',phone:'0967890123',email:'lan@email.com'},
    ];
    const packages = GFData.packages || [
        {id:'GP001',name:'Basic 1 tháng',price:650000,duration:'1 tháng',features:['Phòng tập cơ bản','Thay đồ','Tủ khóa']},
        {id:'GP002',name:'Premium 3 tháng',price:2850000,duration:'3 tháng',popular:true,features:['Tất cả khu vực','Pool','Sauna','1 buổi PT miễn phí']},
        {id:'GP003',name:'VIP 6 tháng',price:7200000,duration:'6 tháng',features:['Premium + PT không giới hạn','Tư vấn dinh dưỡng','Ưu tiên đặt lịch']},
        {id:'GP004',name:'PT Package 10 buổi',price:3500000,duration:'10 buổi PT',features:['10 buổi PT cá nhân','Lộ trình tập cá nhân','Theo dõi tiến trình']},
    ];
    const vouchers = { 'GYMFLOW10': 10, 'SUMMER20': 20, 'WELCOME15': 15, 'VIP50': 50 };
    const methods = [
        { id: 'cash', label: 'Tiền mặt', icon: 'bi-cash-stack', desc: 'Thanh toán trực tiếp tại quầy' },
        { id: 'transfer', label: 'Chuyển khoản', icon: 'bi-bank', desc: 'Ngân hàng nội địa / quốc tế' },
        { id: 'card', label: 'Thẻ ngân hàng', icon: 'bi-credit-card-fill', desc: 'Visa, Mastercard, JCB' },
        { id: 'vnpay', label: 'VNPay', icon: 'bi-phone-fill', desc: 'Ví điện tử VNPay QR' },
    ];

    let step = 1;
    let selectedMember = null;
    let selectedPackage = params && params.packageId ? packages.find(p => p.id === params.packageId) : null;
    let voucherCode = '';
    let discount = 0;
    let selectedMethod = '';
    let invoiceId = 'HD' + Date.now().toString().slice(-6);

    if (params && params.packageId && selectedPackage) step = 1; // still need member

    function finalAmount() {
        if (!selectedPackage) return 0;
        return Math.round(selectedPackage.price * (1 - discount / 100));
    }

    function renderStep() {
        const stepTitles = ['Chọn hội viên', 'Chọn gói tập', 'Áp voucher', 'Phương thức thanh toán', 'Xác nhận & thanh toán'];
        const content = document.getElementById('payment-step-content');
        const stepsBar = document.getElementById('payment-steps-bar');
        if (!content) return;

        // Steps bar
        if (stepsBar) stepsBar.innerHTML = stepTitles.map((t, i) => `
            <div class="d-flex align-items-center ${i < stepTitles.length - 1 ? 'flex-fill' : ''}">
                <div class="d-flex flex-column align-items-center">
                    <div class="step-circle ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''}">${i + 1 < step ? '<i class="bi bi-check-lg"></i>' : i + 1}</div>
                    <div class="step-label ${i + 1 === step ? 'text-primary fw-semibold' : 'text-muted'}">${t}</div>
                </div>
                ${i < stepTitles.length - 1 ? `<div class="flex-fill mx-2 border-top ${i + 1 < step ? 'border-primary' : ''}" style="margin-bottom:20px"></div>` : ''}
            </div>
        `).join('');

        if (step === 1) {
            content.innerHTML = `
                <h5 class="fw-semibold mb-4">Chọn hội viên</h5>
                <div class="mb-3">
                    <div class="input-group input-group-lg">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" id="member-search-input" placeholder="Tìm tên, mã hội viên, SĐT…">
                    </div>
                </div>
                <div id="member-list">
                    ${members.map(m => `
                    <div class="d-flex align-items-center gap-3 p-3 border rounded-3 mb-2 member-select-row ${selectedMember && selectedMember.id === m.id ? 'border-primary bg-blue-light' : ''}" style="cursor:pointer" onclick="selectMember('${m.id}')">
                        ${GF.renderAvatar(m.name, 40)}
                        <div class="flex-grow-1">
                            <div class="fw-semibold">${m.name}</div>
                            <div class="text-muted" style="font-size:13px">${m.id} · ${m.phone} · ${m.email}</div>
                        </div>
                        ${selectedMember && selectedMember.id === m.id ? '<i class="bi bi-check-circle-fill text-primary fs-5"></i>' : ''}
                    </div>`).join('')}
                </div>
                <div class="d-flex justify-content-end mt-4">
                    <button class="btn btn-primary btn-lg" onclick="if(selectedMember){step=2;renderStep();}else{GF.toast.warning('Vui lòng chọn hội viên!')}">
                        Tiếp theo <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>`;

            window.selectMember = function(id) {
                selectedMember = members.find(m => m.id === id);
                renderStep();
            };

            const inp = document.getElementById('member-search-input');
            if (inp) inp.addEventListener('input', function() {
                const q = this.value.toLowerCase();
                const rows = document.querySelectorAll('.member-select-row');
                rows.forEach(r => r.style.display = q ? (r.textContent.toLowerCase().includes(q) ? '' : 'none') : '');
            });
        }
        else if (step === 2) {
            content.innerHTML = `
                <h5 class="fw-semibold mb-4">Chọn gói tập</h5>
                <div class="row g-3 mb-4">
                    ${packages.map(p => `
                    <div class="col-md-6">
                        <div class="p-4 border rounded-4 position-relative ${selectedPackage && selectedPackage.id === p.id ? 'border-primary' : ''}" style="cursor:pointer;transition:all .2s" onclick="selectPackage('${p.id}')">
                            ${p.popular ? '<span class="badge bg-primary position-absolute" style="top:12px;right:12px">Phổ biến nhất</span>' : ''}
                            <div class="fw-bold mb-1" style="font-size:18px">${p.name}</div>
                            <div class="fw-bold mb-3" style="font-size:26px;color:#2563EB">${GF.fmt.currency(p.price)}</div>
                            <div class="text-muted mb-3" style="font-size:13px"><i class="bi bi-clock me-1"></i>${p.duration}</div>
                            <ul class="list-unstyled mb-0">
                                ${p.features.map(f => `<li style="font-size:13px;margin-bottom:4px"><i class="bi bi-check-circle-fill text-success me-2"></i>${f}</li>`).join('')}
                            </ul>
                            ${selectedPackage && selectedPackage.id === p.id ? '<div class="mt-3 text-primary fw-semibold"><i class="bi bi-check-circle-fill me-1"></i>Đã chọn</div>' : ''}
                        </div>
                    </div>`).join('')}
                </div>
                <div class="d-flex justify-content-between mt-4">
                    <button class="btn btn-outline-secondary btn-lg" onclick="step=1;renderStep()"><i class="bi bi-arrow-left me-2"></i>Quay lại</button>
                    <button class="btn btn-primary btn-lg" onclick="if(selectedPackage){step=3;renderStep();}else{GF.toast.warning('Vui lòng chọn gói tập!')}">
                        Tiếp theo <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>`;

            window.selectPackage = function(id) {
                selectedPackage = packages.find(p => p.id === id);
                renderStep();
            };
        }
        else if (step === 3) {
            content.innerHTML = `
                <h5 class="fw-semibold mb-2">Áp mã giảm giá (Voucher)</h5>
                <p class="text-muted mb-4">Bỏ qua nếu không có voucher</p>
                <div class="row g-3 mb-4">
                    <div class="col-md-8">
                        <div class="input-group input-group-lg">
                            <span class="input-group-text"><i class="bi bi-ticket-perforated-fill text-primary"></i></span>
                            <input type="text" class="form-control text-uppercase" id="voucher-input" placeholder="Nhập mã voucher…" value="${voucherCode}">
                            <button class="btn btn-primary" onclick="applyVoucher()">Áp dụng</button>
                        </div>
                        <div id="voucher-result" class="mt-2"></div>
                    </div>
                </div>
                <div class="card p-4 mb-4" style="background:#F8FAFC">
                    <h6 class="fw-semibold mb-3">Tóm tắt đơn hàng</h6>
                    <div class="d-flex justify-content-between mb-2"><span>Gói tập:</span><span class="fw-semibold">${selectedPackage.name}</span></div>
                    <div class="d-flex justify-content-between mb-2"><span>Giá gốc:</span><span>${GF.fmt.currency(selectedPackage.price)}</span></div>
                    <div class="d-flex justify-content-between mb-2 text-success" id="discount-row" style="display:${discount ? '' : 'none'}!important">
                        <span>Giảm giá (${discount}%):</span>
                        <span>-${GF.fmt.currency(Math.round(selectedPackage.price * discount / 100))}</span>
                    </div>
                    <div class="d-flex justify-content-between border-top pt-2 mt-2">
                        <span class="fw-bold">Tổng thanh toán:</span>
                        <span class="fw-bold fs-5 text-primary" id="final-amount-display">${GF.fmt.currency(finalAmount())}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-secondary btn-lg" onclick="step=2;renderStep()"><i class="bi bi-arrow-left me-2"></i>Quay lại</button>
                    <button class="btn btn-primary btn-lg" onclick="step=4;renderStep()">Tiếp theo <i class="bi bi-arrow-right ms-2"></i></button>
                </div>`;

            window.applyVoucher = function() {
                const code = document.getElementById('voucher-input').value.toUpperCase().trim();
                const result = document.getElementById('voucher-result');
                if (vouchers[code]) {
                    discount = vouchers[code];
                    voucherCode = code;
                    result.innerHTML = `<div class="alert alert-success py-2 mb-0"><i class="bi bi-check-circle-fill me-2"></i>Áp dụng voucher <strong>${code}</strong> thành công – Giảm ${discount}%!</div>`;
                    document.getElementById('final-amount-display').textContent = GF.fmt.currency(finalAmount());
                    const dr = document.getElementById('discount-row');
                    if (dr) dr.style.display = '';
                } else {
                    discount = 0;
                    voucherCode = '';
                    result.innerHTML = `<div class="alert alert-danger py-2 mb-0"><i class="bi bi-x-circle-fill me-2"></i>Mã voucher không hợp lệ hoặc đã hết hạn</div>`;
                    document.getElementById('final-amount-display').textContent = GF.fmt.currency(finalAmount());
                }
            };
        }
        else if (step === 4) {
            content.innerHTML = `
                <h5 class="fw-semibold mb-4">Chọn phương thức thanh toán</h5>
                <div class="row g-3 mb-4">
                    ${methods.map(m => `
                    <div class="col-md-6">
                        <div class="p-4 border rounded-4 d-flex align-items-center gap-3 ${selectedMethod === m.id ? 'border-primary' : ''}" style="cursor:pointer;transition:all .2s" onclick="selectMethod('${m.id}')">
                            <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;background:#EFF6FF">
                                <i class="bi ${m.icon} text-primary fs-4"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold">${m.label}</div>
                                <div class="text-muted" style="font-size:12px">${m.desc}</div>
                            </div>
                            ${selectedMethod === m.id ? '<i class="bi bi-check-circle-fill text-primary fs-5"></i>' : ''}
                        </div>
                    </div>`).join('')}
                </div>
                ${selectedMethod === 'vnpay' ? `
                <div class="text-center p-4 bg-light rounded-3 mb-4">
                    <div class="mb-2 fw-semibold">Quét mã QR để thanh toán</div>
                    <div style="width:160px;height:160px;margin:0 auto;background:#fff;border:2px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center">
                        <div style="font-size:10px;color:#999;text-align:center">QR Code<br>VNPay</div>
                    </div>
                    <div class="mt-2 text-muted" style="font-size:12px">Hết hạn sau 5:00 phút</div>
                </div>` : ''}
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-secondary btn-lg" onclick="step=3;renderStep()"><i class="bi bi-arrow-left me-2"></i>Quay lại</button>
                    <button class="btn btn-primary btn-lg" onclick="if(selectedMethod){step=5;renderStep();}else{GF.toast.warning('Vui lòng chọn phương thức thanh toán!')}">
                        Tiếp theo <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>`;

            window.selectMethod = function(id) {
                selectedMethod = id;
                renderStep();
            };
        }
        else if (step === 5) {
            const methodLabel = methods.find(m => m.id === selectedMethod)?.label || '';
            content.innerHTML = `
                <h5 class="fw-semibold mb-4">Xác nhận & Thanh toán</h5>
                <div class="card p-4 mb-4">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <h6 class="fw-semibold text-muted mb-3">Thông tin hội viên</h6>
                            <div class="d-flex align-items-center gap-3">
                                ${GF.renderAvatar(selectedMember.name, 48)}
                                <div>
                                    <div class="fw-bold">${selectedMember.name}</div>
                                    <div class="text-muted">${selectedMember.id}</div>
                                    <div class="text-muted">${selectedMember.phone}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-semibold text-muted mb-3">Chi tiết gói</h6>
                            <div class="mb-1"><span class="text-muted">Gói:</span> <strong>${selectedPackage.name}</strong></div>
                            <div class="mb-1"><span class="text-muted">Thời hạn:</span> ${selectedPackage.duration}</div>
                            <div class="mb-1"><span class="text-muted">Phương thức:</span> ${methodLabel}</div>
                            ${voucherCode ? `<div><span class="text-muted">Voucher:</span> <span class="text-success">${voucherCode} (-${discount}%)</span></div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="p-4 rounded-4 text-center mb-4" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE)">
                    <div class="text-muted mb-1">Tổng thanh toán</div>
                    <div class="fw-bold" style="font-size:36px;color:#2563EB">${GF.fmt.currency(finalAmount())}</div>
                    ${discount ? `<div class="text-success" style="font-size:13px"><s>${GF.fmt.currency(selectedPackage.price)}</s> Tiết kiệm ${GF.fmt.currency(selectedPackage.price - finalAmount())}</div>` : ''}
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-secondary btn-lg" onclick="step=4;renderStep()"><i class="bi bi-arrow-left me-2"></i>Quay lại</button>
                    <button class="btn btn-success btn-lg px-5" onclick="processPayment()">
                        <i class="bi bi-check-circle-fill me-2"></i>Xác nhận thanh toán
                    </button>
                </div>`;

            window.processPayment = function() {
                const btn = document.querySelector('.btn-success.btn-lg');
                if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang xử lý…'; }
                setTimeout(() => {
                    step = 6;
                    renderStep();
                }, 1500);
            };
        }
        else if (step === 6) {
            // Success state with confetti
            content.innerHTML = `
                <style>
                    @keyframes confetti-fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(300px) rotate(720deg);opacity:0} }
                    .confetti-piece { position:absolute;width:10px;height:10px;border-radius:2px;animation:confetti-fall 1.5s ease-out forwards; }
                </style>
                <div class="text-center py-5 position-relative overflow-hidden">
                    <div class="position-relative" style="height:60px">
                        ${[...Array(15)].map((_, i) => `<div class="confetti-piece" style="left:${Math.random()*100}%;background:${['#2563EB','#10B981','#F59E0B','#8B5CF6','#EF4444'][i%5]};animation-delay:${Math.random()*0.5}s;animation-duration:${1.2+Math.random()*0.8}s"></div>`).join('')}
                    </div>
                    <div class="mb-4" style="width:80px;height:80px;background:linear-gradient(135deg,#10B981,#059669);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:36px;color:#fff">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <h3 class="fw-bold text-success mb-2">Thanh toán thành công!</h3>
                    <p class="text-muted mb-1">Mã hóa đơn: <strong class="text-primary">${invoiceId}</strong></p>
                    <p class="text-muted mb-4">Số tiền: <strong>${GF.fmt.currency(finalAmount())}</strong></p>
                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <button class="btn btn-primary btn-lg" onclick="GF.navigate('cashier-invoice',{id:'${invoiceId}'})">
                            <i class="bi bi-receipt me-2"></i>Xem hóa đơn
                        </button>
                        <button class="btn btn-outline-secondary btn-lg" onclick="GF.toast.info('Đang in hóa đơn…')">
                            <i class="bi bi-printer me-2"></i>In hóa đơn
                        </button>
                        <button class="btn btn-outline-primary btn-lg" onclick="GF.navigate('cashier-dashboard')">
                            <i class="bi bi-house me-2"></i>Về trang chủ
                        </button>
                    </div>
                </div>`;
        }
    }

    document.getElementById('main-content').innerHTML = `
        <style>
            .step-circle { width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#E2E8F0;color:#64748B;font-weight:600;font-size:14px;margin-bottom:6px; }
            .step-circle.active { background:#2563EB;color:#fff; }
            .step-circle.done { background:#10B981;color:#fff; }
            .step-label { font-size:11px;white-space:nowrap; }
            .bg-blue-light { background:#EFF6FF!important; }
        </style>
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Tạo Thanh Toán</h1>
                <p class="page-subtitle text-muted">Xử lý thanh toán gói tập theo từng bước</p>
            </div>
            <button class="btn btn-outline-secondary" onclick="GF.navigate('cashier-payments')">
                <i class="bi bi-x-lg me-1"></i>Hủy
            </button>
        </div>
        <!-- Steps bar -->
        <div class="card p-4 mb-4">
            <div class="d-flex align-items-start" id="payment-steps-bar"></div>
        </div>
        <!-- Step content -->
        <div class="card p-4" id="payment-step-content"></div>
    `;

    // Expose to window
    window.step = step;
    window.selectedMember = selectedMember;
    window.selectedPackage = selectedPackage;
    window.discount = discount;
    window.selectedMethod = selectedMethod;
    window.voucherCode = voucherCode;
    window.finalAmount = finalAmount;
    window.renderStep = renderStep;

    renderStep();
};

// ─── cashier-invoice ─────────────────────────────────────────
GF.screens['cashier-invoice'] = function(params) {
    const id = (params && params.id) || 'HD001';
    const invoice = {
        id,
        member: { name: 'Nguyễn Thị Lan', id: 'MV006', phone: '0967890123', email: 'lan@gymflow.vn' },
        package: { name: 'Premium 3 tháng', duration: '3 tháng', startDate: '2026-07-14', endDate: '2026-10-14', price: 2850000 },
        amount: 2850000,
        discount: 0,
        method: 'Chuyển khoản',
        bank: 'Ngân hàng VietcomBank – 1234567890',
        status: 'completed',
        date: '2026-07-14 11:30:00',
        cashier: 'Trần Thị Thu Hà',
        notes: 'Gia hạn gói tập lần 3',
    };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Hóa Đơn Chi Tiết</h1>
                <p class="page-subtitle text-muted">Thông tin chi tiết giao dịch</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary" onclick="GF.toast.info('Đang in hóa đơn...')"><i class="bi bi-printer me-1"></i>In</button>
                <button class="btn btn-outline-primary" onclick="GF.toast.info('Đang tải PDF...')"><i class="bi bi-download me-1"></i>Tải PDF</button>
                <button class="btn btn-outline-success" onclick="GF.toast.success('Đã gửi hóa đơn qua email!')"><i class="bi bi-envelope me-1"></i>Gửi Email</button>
                <button class="btn btn-outline-danger" onclick="GF.modal.confirm({title:'Hủy giao dịch',message:'Bạn có chắc muốn hủy giao dịch này? Hành động không thể hoàn tác.',confirmText:'Hủy giao dịch',type:'danger',onConfirm:function(){GF.toast.success('Đã hủy giao dịch!');}})">
                    <i class="bi bi-x-circle me-1"></i>Hủy GD
                </button>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card p-5" id="invoice-printable">
                    <!-- Invoice Header -->
                    <div class="d-flex justify-content-between align-items-start mb-5">
                        <div>
                            <h2 class="fw-bold mb-1" style="color:#2563EB">GymFlow</h2>
                            <div class="text-muted" style="font-size:13px">123 Nguyễn Huệ, Q.1, TP.HCM</div>
                            <div class="text-muted" style="font-size:13px">ĐT: 028 3822 1234</div>
                        </div>
                        <div class="text-end">
                            <h3 class="fw-bold mb-1">HÓA ĐƠN</h3>
                            <div class="fw-semibold text-primary" style="font-size:18px">#${invoice.id}</div>
                            <div class="text-muted" style="font-size:13px">${invoice.date}</div>
                            ${GF.renderBadge(invoice.status)}
                        </div>
                    </div>

                    <!-- Member & Cashier Info -->
                    <div class="row mb-5">
                        <div class="col-md-6">
                            <div class="fw-semibold text-muted text-uppercase mb-2" style="font-size:11px;letter-spacing:.1em">Thông tin hội viên</div>
                            <div class="fw-bold">${invoice.member.name}</div>
                            <div class="text-muted">Mã HV: ${invoice.member.id}</div>
                            <div class="text-muted">${invoice.member.phone}</div>
                            <div class="text-muted">${invoice.member.email}</div>
                        </div>
                        <div class="col-md-6">
                            <div class="fw-semibold text-muted text-uppercase mb-2" style="font-size:11px;letter-spacing:.1em">Thu ngân xử lý</div>
                            <div class="fw-bold">${invoice.cashier}</div>
                            <div class="text-muted">Phương thức: ${invoice.method}</div>
                            <div class="text-muted">${invoice.bank}</div>
                            ${invoice.notes ? `<div class="text-muted">Ghi chú: ${invoice.notes}</div>` : ''}
                        </div>
                    </div>

                    <!-- Items -->
                    <table class="table border-top border-bottom mb-4">
                        <thead>
                            <tr class="border-bottom">
                                <th class="py-3 border-0">Gói tập</th>
                                <th class="py-3 border-0">Thời hạn</th>
                                <th class="py-3 border-0">Bắt đầu</th>
                                <th class="py-3 border-0 text-end">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="py-3 fw-semibold border-0">${invoice.package.name}</td>
                                <td class="py-3 border-0">${invoice.package.duration}</td>
                                <td class="py-3 border-0">${GF.fmt.date(invoice.package.startDate)} → ${GF.fmt.date(invoice.package.endDate)}</td>
                                <td class="py-3 border-0 text-end fw-semibold">${GF.fmt.currency(invoice.package.price)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Totals -->
                    <div class="row justify-content-end">
                        <div class="col-md-5">
                            <div class="d-flex justify-content-between mb-2"><span class="text-muted">Tạm tính:</span><span>${GF.fmt.currency(invoice.package.price)}</span></div>
                            <div class="d-flex justify-content-between mb-2"><span class="text-muted">Giảm giá:</span><span class="text-success">-${GF.fmt.currency(invoice.discount)}</span></div>
                            <div class="d-flex justify-content-between border-top pt-2">
                                <span class="fw-bold">Tổng cộng:</span>
                                <span class="fw-bold text-primary" style="font-size:18px">${GF.fmt.currency(invoice.amount)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="border-top mt-5 pt-4 text-center text-muted" style="font-size:12px">
                        <p>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của GymFlow!</p>
                        <p>Mọi thắc mắc xin liên hệ: support@gymflow.vn | 028 3822 1234</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card p-4 mb-3">
                    <h6 class="fw-semibold mb-3">Trạng thái giao dịch</h6>
                    <div class="d-flex flex-column gap-3">
                        ${[
                            { label: 'Tạo hóa đơn', time: '2026-07-14 11:28', done: true },
                            { label: 'Xác nhận thanh toán', time: '2026-07-14 11:30', done: true },
                            { label: 'Kích hoạt gói tập', time: '2026-07-14 11:30', done: true },
                            { label: 'Gửi email xác nhận', time: '2026-07-14 11:31', done: true },
                        ].map((s, i) => `
                        <div class="d-flex gap-3 align-items-start">
                            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:28px;height:28px;background:${s.done?'#10B981':'#E2E8F0'};color:${s.done?'#fff':'#64748B'}">
                                ${s.done ? '<i class="bi bi-check-lg" style="font-size:12px"></i>' : `${i+1}`}
                            </div>
                            <div>
                                <div class="fw-medium" style="font-size:13px">${s.label}</div>
                                <div class="text-muted" style="font-size:11px">${s.time}</div>
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
                <div class="card p-4">
                    <h6 class="fw-semibold mb-3">Thao tác</h6>
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-outline-primary" onclick="GF.toast.info('Đang in...')"><i class="bi bi-printer me-2"></i>In hóa đơn</button>
                        <button class="btn btn-outline-secondary" onclick="GF.toast.info('Đang xuất PDF...')"><i class="bi bi-file-pdf me-2"></i>Tải PDF</button>
                        <button class="btn btn-outline-success" onclick="GF.toast.success('Đã gửi email!')"><i class="bi bi-envelope me-2"></i>Gửi Email hội viên</button>
                        <button class="btn btn-outline-danger" onclick="GF.modal.confirm({title:'Hoàn tiền',message:'Xác nhận hoàn tiền giao dịch ${id}?',confirmText:'Hoàn tiền',type:'warning',onConfirm:function(){GF.toast.success('Đã tạo yêu cầu hoàn tiền!')}})"><i class="bi bi-arrow-counterclockwise me-2"></i>Yêu cầu hoàn tiền</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// ─── cashier-history ─────────────────────────────────────────
GF.screens['cashier-history'] = function(params) {
    const history = [
        { id: 'HD001', member: 'Nguyễn Thị Lan', package: 'Premium 3 tháng', amount: 2850000, method: 'Chuyển khoản', status: 'completed', date: '2026-07-14' },
        { id: 'HD002', member: 'Trần Văn Bảo', package: 'Basic 1 tháng', amount: 650000, method: 'Tiền mặt', status: 'completed', date: '2026-07-14' },
        { id: 'HD003', member: 'Lê Minh Cường', package: 'VIP 6 tháng', amount: 7200000, method: 'VNPay', status: 'completed', date: '2026-07-14' },
        { id: 'HD004', member: 'Phạm Thị Mai', package: 'PT Package 10 buổi', amount: 3500000, method: 'Thẻ ngân hàng', status: 'pending', date: '2026-07-14' },
        { id: 'HD005', member: 'Hoàng Văn Đức', package: 'Premium 1 tháng', amount: 1200000, method: 'VNPay', status: 'refunded', date: '2026-07-13' },
        { id: 'HD006', member: 'Vũ Thị Hoa', package: 'Basic 3 tháng', amount: 1500000, method: 'Tiền mặt', status: 'completed', date: '2026-07-12' },
        { id: 'HD007', member: 'Bùi Minh Tuấn', package: 'Premium 6 tháng', amount: 5400000, method: 'Chuyển khoản', status: 'completed', date: '2026-07-11' },
        { id: 'HD008', member: 'Đinh Văn Giang', package: 'VIP 1 năm', amount: 9600000, method: 'Thẻ ngân hàng', status: 'completed', date: '2026-07-10' },
    ];

    const total = history.filter(h=>h.status==='completed').reduce((s,h)=>s+h.amount,0);
    const count = history.length;
    const avg = Math.round(total / history.filter(h=>h.status==='completed').length);
    const statusColor = { completed: '#10B981', pending: '#F59E0B', refunded: '#64748B', failed: '#EF4444' };
    const statusLabel = { completed: 'Hoàn thành', pending: 'Chờ xử lý', refunded: 'Hoàn tiền', failed: 'Thất bại' };

    document.getElementById('main-content').innerHTML = `
        <div class="page-header mb-4">
            <div>
                <h1 class="page-title">Lịch Sử Giao Dịch</h1>
                <p class="page-subtitle text-muted">Toàn bộ lịch sử thanh toán</p>
            </div>
            <button class="btn btn-outline-secondary" onclick="GF.toast.info('Đang xuất Excel...')">
                <i class="bi bi-file-excel me-2"></i>Xuất Excel
            </button>
        </div>

        <!-- Summary cards -->
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <div class="card p-4 text-center">
                    <div class="fw-bold text-primary mb-1" style="font-size:24px">${GF.fmt.currency(total)}</div>
                    <div class="text-muted">Tổng doanh thu</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center">
                    <div class="fw-bold" style="font-size:24px">${count}</div>
                    <div class="text-muted">Tổng giao dịch</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center">
                    <div class="fw-bold text-success mb-1" style="font-size:24px">${GF.fmt.currency(avg)}</div>
                    <div class="text-muted">Trung bình/GD</div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="card mb-3 p-3">
            <div class="row g-2">
                <div class="col-md-3">
                    <input type="date" class="form-control" id="hist-from" placeholder="Từ ngày">
                </div>
                <div class="col-md-3">
                    <input type="date" class="form-control" id="hist-to" placeholder="Đến ngày">
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="hist-method">
                        <option value="">Phương thức</option>
                        <option>Tiền mặt</option>
                        <option>Chuyển khoản</option>
                        <option>Thẻ ngân hàng</option>
                        <option>VNPay</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <button class="btn btn-primary w-100" onclick="GF.toast.info('Đang lọc...')"><i class="bi bi-filter me-1"></i>Lọc</button>
                </div>
            </div>
        </div>

        <div class="card p-0">
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr><th>Mã HĐ</th><th>Hội viên</th><th>Gói tập</th><th>Số tiền</th><th>Phương thức</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        ${history.map(h => `
                        <tr>
                            <td><a href="#" class="fw-semibold text-primary" onclick="GF.navigate('cashier-invoice',{id:'${h.id}'})">${h.id}</a></td>
                            <td>${h.member}</td>
                            <td>${h.package}</td>
                            <td class="fw-bold text-primary">${GF.fmt.currency(h.amount)}</td>
                            <td>${h.method}</td>
                            <td>${GF.fmt.date(h.date)}</td>
                            <td><span class="badge" style="background:${statusColor[h.status]}22;color:${statusColor[h.status]}">${statusLabel[h.status]}</span></td>
                            <td><button class="btn btn-sm btn-outline-primary" onclick="GF.navigate('cashier-invoice',{id:'${h.id}'})"><i class="bi bi-eye"></i></button></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
