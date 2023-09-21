import mongoose from "mongoose";

const connectDB = async() => { 
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connection detail: HOST: ${conn.connection.host}, NAME: ${conn.connection.name}`);
    mongoose.connection.on('open', () => { 
      console.log('MongoDB connection is established');
    })
  } catch (err) { 
    console.log(`Error: ${err.message}`);
    process.exit(1); // ép buộc node phải ngừng toàn bộ tiến trình execution, 
    //mã 1 cho biết sự kết thúc này không nằm trong dự tính, là do lỗi mà ra,
  }
};

export default connectDB;

// có các bước như sau:
// 1. gọi người trung chuyển (mongoose) để kết nối với mongoDB 
// 2. yêu cầu người trung chuyển kết nối với DB
// 3. nếu kết nối thành công, hãy báo cáo chi tiết về kết nối đó 
// 4. làm sao biết kết nối chắc chắn thành công?, hãy kết nối open event với một function để báo cáo
// 5. nếu kết nối không thành công, hãy báo chi tiết về lỗi 
// 6. ép buộc node ngừng toàn bộ tiến trình nếu lỗi xảy ra ngay từ đầu

// nếu kết nối thành công, conn sẽ bao gồm:
// 1. connection object: chứa host, name, port 

// EventEmitter .on() như trên:
// 1. nhằm thông báo về sự kiện mở thành công kết nối với db 
// 2. on, once là những fn chứa sẵn trong mongoose.connection(), nhằm tạo ra các event listener
// 3. on() kết nối event với fn cho mỗi lần event xuất hiện 
// 4. once() kết nối event với fn chỉ một lần event xuất hiện 

// nếu kết nối không thành công err sẽ bao gồm: 
// 1. message: chi tiết về lỗi 
// 2. name: mã lỗi 
// 3. stack: toàn bộ tiến trình dẫn đến lỗi 