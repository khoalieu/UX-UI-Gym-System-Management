window.GFData = {
  members: [
    {id:'MV001',name:'Nguyễn Văn An',phone:'0901 234 567',email:'an.nguyen@gmail.com',package:'Premium 3 tháng',expiry:'2026-10-12',status:'active',joinDate:'2026-07-02'},
    {id:'MV002',name:'Trần Thị Bình',phone:'0902 345 678',email:'binh.tran@gmail.com',package:'Basic 1 tháng',expiry:'2026-08-01',status:'expiring',joinDate:'2026-07-05'},
    {id:'MV003',name:'Lê Minh Cường',phone:'0903 456 789',email:'cuong.le@gmail.com',package:'VIP 6 tháng',expiry:'2027-01-09',status:'active',joinDate:'2026-06-10'},
    {id:'MV004',name:'Phạm Thị Dung',phone:'0904 567 890',email:'dung.pham@gmail.com',package:'Premium 3 tháng',expiry:'2026-09-20',status:'paused',joinDate:'2026-05-22'},
    {id:'MV005',name:'Hoàng Văn Đức',phone:'0905 678 901',email:'duc.hoang@gmail.com',package:'Basic 1 tháng',expiry:'2026-07-01',status:'expired',joinDate:'2026-04-14'}
  ],
  packages: [
    {id:'G01',name:'Basic',price:650000,duration:'1 tháng',color:'#10b981',features:['Không giới hạn lượt tập','Tủ đồ cá nhân','Đo chỉ số cơ thể']},
    {id:'G02',name:'Premium',price:2850000,duration:'3 tháng',color:'#2563eb',popular:true,features:['Toàn bộ quyền lợi Basic','4 buổi PT cá nhân','Xông hơi & lớp nhóm']},
    {id:'G03',name:'VIP',price:7200000,duration:'6 tháng',color:'#8b5cf6',features:['Toàn bộ quyền lợi Premium','12 buổi PT cá nhân','Khăn tập và nước miễn phí']}
  ],
  payments:[{id:'HD001',member:'Nguyễn Văn An',amount:2850000,date:'2026-07-14',status:'completed'}],
  checkins:[{id:'CI01',member:'Nguyễn Văn An',date:'2026-07-14T08:15',status:'success'}],
  ptSessions:[{id:'PT01',member:'Trần Thị Bình',date:'2026-07-14T14:00',status:'confirmed'}],
  maintenance:[{id:'BT001',equipment:'Máy chạy bộ T-08',status:'in-progress'}],
  equipment:[
    {id:'TB001',name:'Máy chạy bộ T-01',area:'Khu Cardio',status:'active',last:'02/07/2026'},
    {id:'TB002',name:'Xe đạp tập C-04',area:'Khu Cardio',status:'inspection',last:'12/07/2026'},
    {id:'TB003',name:'Giàn tạ đa năng W-02',area:'Khu sức mạnh',status:'maintenance',last:'14/07/2026'},
    {id:'TB004',name:'Máy ép ngực P-05',area:'Khu sức mạnh',status:'broken',last:'10/07/2026'}
  ]
};
