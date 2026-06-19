// ============================================================
// PHẦN 1: TOAST NOTIFICATION (Thông báo nổi góc màn hình)
// ============================================================

/**
 * Hàm showToast - Hiển thị thông báo nổi (toast) ở góc trên bên phải.
 * Cách hoạt động:
 *   1. Tạo một <div class="toast"> mới bằng createElement
 *   2. Chèn HTML nội dung vào div đó qua innerHTML (template literal)
 *   3. Gắn div vào #toast-container để hiển thị trên giao diện
 *   4. Đặt hẹn giờ tự động xóa sau 3500ms (3.5 giây)
 */
const showToast = (title, message) => {
    // Lấy phần tử cha (#toast-container) chứa tất cả các toast đang hiển thị
    const container = document.getElementById("toast-container");

    // Tạo một thẻ <div> mới trong bộ nhớ (chưa hiển thị lên màn hình)
    const toast = document.createElement("div");

    // Gán class "toast" để CSS áp dụng kiểu dáng và animation slideInRight
    toast.className = "toast";

    // Dùng template literal để tạo nội dung HTML bên trong toast.
    // ${title} và ${message} được nhúng trực tiếp vào chuỗi HTML.
    // Nút × gọi removeToast(this.parentElement) khi người dùng bấm đóng thủ công.
    toast.innerHTML = `
        <div class="toast-icon">✓</div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast(this.parentElement)">×</button>
    `;

    // Gắn toast vào cuối danh sách bên trong container → Toast xuất hiện trên màn hình
    container.appendChild(toast);

    // Hẹn giờ: sau 3500ms (3.5 giây) tự động gọi removeToast để xóa toast này
    setTimeout(() => removeToast(toast), 3500);
};

/**
 * Hàm removeToast - Xóa một toast khỏi màn hình với hiệu ứng mờ dần (fade-out).
 * Cách hoạt động:
 *   1. Kiểm tra bảo vệ: nếu toast null HOẶC đang xóa rồi → thoát ngay
 *   2. Thêm class "removing" → CSS kích hoạt animation slideOutRight (300ms)
 *   3. Sau 300ms, gọi .remove() để xóa hẳn khỏi DOM
 * Guard Clause giúp tránh lỗi khi hàm bị gọi 2 lần (vừa hết giờ vừa bấm nút ×).
 */
const removeToast = (toast) => {
    // [ĐIỀU KIỆN BẢO VỆ] Nếu toast không tồn tại (null/undefined)
    // HOẶC đã có class "removing" (đang trong quá trình ẩn) → thoát ngay
    // Dùng return sớm để không chạy các dòng tiếp theo một cách vô nghĩa
    if (!toast || toast.classList.contains("removing")) return;

    // Thêm class "removing" để CSS chạy animation fade-out (slideOutRight 0.3s)
    toast.classList.add("removing");

    // Sau khi animation kết thúc (300ms), xóa phần tử hoàn toàn khỏi DOM
    // Dùng setTimeout đồng bộ với thời gian animation CSS
    setTimeout(() => toast.remove(), 300);
};


// ============================================================
// PHẦN 2: MODAL & OVERLAY - Hộp thoại và lớp nền mờ
// ============================================================

// Lấy phần tử overlay (lớp nền tối mờ phủ sau modal)
const overlayElement = document.getElementById("overlay");

/**
 * Hàm openModal - Hiển thị một modal và lớp overlay phía sau.
 * Thay đổi thuộc tính CSS display:
 *   - modal: "none" → "block" (hiện modal)
 *   - overlay: "none" → "block" (hiện lớp nền mờ)
 */
const openModal = (modal) => {
    modal.style.display = "block";         // Hiện hộp thoại
    overlayElement.style.display = "block"; // Hiện lớp nền mờ phía sau
};

/**
 * Hàm closeModal - Ẩn một modal và lớp overlay phía sau.
 * Đưa display về "none" để ẩn cả modal lẫn overlay.
 */
const closeModal = (modal) => {
    modal.style.display = "none";           // Ẩn hộp thoại
    overlayElement.style.display = "none";  // Ẩn lớp nền mờ
};


// ============================================================
// PHẦN 3: KHAI BÁO BIẾN DOM - Liên kết tới các phần tử HTML
// ============================================================
// Nhóm: Đăng xuất
const avatarElement       = document.getElementById("avatar");       // Ảnh avatar người dùng
const logoutMenuElement   = document.getElementById("logoutMenu");   // Menu con "Đăng xuất"
const logoutBtnElement    = document.getElementById("logoutBtn");    // Nút "Đăng xuất" trong menu con

const modalLogoutElement  = document.querySelector(".modal-logout");  // Modal xác nhận đăng xuất
const closeLogoutElement  = document.querySelector(".close-logout");  // Nút × đóng modal đăng xuất
const cancelLogoutElement = document.querySelector(".logout-cancel"); // Nút "Hủy" trong modal đăng xuất
const confirmLogoutElement= document.querySelector(".logout-confirm");// Nút "Đăng xuất" xác nhận

// Nhóm: Bảng dữ liệu
const tableTbodyElement   = document.getElementById("tbody");        // <tbody> chứa các hàng bài học

// Nhóm: Modal Thêm mới
const modalAddElement          = document.getElementById("modal-add");     // Hộp thoại thêm mới
const modalCloseIcon           = document.getElementById("closeIcon");     // Nút × đóng modal thêm mới
const modalCloseCancel         = document.getElementById("closeCancel");   // Nút "Hủy" trong modal thêm mới
const btnAddSubjectElemeent    = document.getElementById("btnAdd");        // Nút "Thêm mới" trên trang chính
const btnAddLesson             = document.getElementById("btnAddLesson");  // Nút "Thêm" trong modal

const nameSubjectInputElement  = document.getElementById("nameSubject");   // Input tên bài học
const subjectNameSelectElement = document.getElementById("subjectName");   // Dropdown môn học
const errSubjectElement        = document.getElementById("error-subject"); // Thông báo lỗi môn học
const numberInputElement       = document.getElementById("numberSubject"); // Input thời lượng (phút)
const errNameSubjectElement    = document.getElementById("error-name");    // Thông báo lỗi tên bài học
const errNumberSubjectElement  = document.getElementById("error-number");  // Thông báo lỗi thời lượng

// Nhóm: Bộ lọc và Tìm kiếm
const filterStatusElement  = document.getElementById("filter-status");  // Dropdown lọc trạng thái
const filterSubjectElement = document.getElementById("filter-subject"); // Dropdown lọc môn học
const searchInputElement   = document.getElementById("search-input");   // Ô nhập từ khóa tìm kiếm

// Nhóm: Modal Xóa
const modalDeleteElement       = document.getElementById("modal-delete");       // Hộp thoại xác nhận xóa
const btnDeleteElement         = document.getElementById("btnDelete");          // Nút "Xóa" xác nhận
const btnDeleteCancelElement   = document.getElementById("closeCancelDelete");  // Nút "Hủy" xóa
const subjectTextElement       = document.getElementById("subjectText");        // Tên bài học hiển thị trong modal xóa

// Nhóm: Modal Sửa
const modalEditElement         = document.getElementById("modal-edit");         // Hộp thoại chỉnh sửa
const modalIconEdit            = document.getElementById("iconEdit");           // Nút × đóng modal sửa
const editNameInputElement     = document.getElementById("edit-name");          // Input tên bài học (edit)
const editNumberInputElement   = document.getElementById("edit-number");        // Input thời lượng (edit)
const subjectNameEditElement   = document.getElementById("edit-subject");       // Dropdown môn học (edit)
const btnEditCancelElement     = document.getElementById("btnCancelEdit");      // Nút "Hủy" trong modal sửa
const btnEditSaveElement       = document.getElementById("btnSave");            // Nút "Lưu" trong modal sửa
const errnameEditElement       = document.getElementById("error-name-edit");    // Lỗi tên (edit)
const errNumberEditElement     = document.getElementById("error-number-edit");  // Lỗi thời lượng (edit)
const errSubjectEditElement    = document.getElementById("error-subject-edit"); // Lỗi môn học (edit)
const statusEditRadios         = document.getElementsByName("status-edit");     // Nhóm radio Trạng thái (edit)

// Nhóm: Phân trang
const buttonNumberElement = document.getElementById("button-number"); // Vùng chứa các nút số trang
const btnPrev             = document.getElementById("btn-prev");       // Nút ← Trang trước
const btnNext             = document.getElementById("btn-next");       // Nút → Trang sau

// Checkbox "chọn tất cả" nằm ở header của bảng (<thead>)
const selectAllCheckbox = document.querySelector("thead input[type='checkbox']");


// ============================================================
// PHẦN 4: BIẾN TRẠNG THÁI (STATE) của ứng dụng
// ============================================================

// Đọc danh sách bài học từ localStorage (nếu chưa có thì khởi tạo mảng rỗng [])
let lessons        = JSON.parse(localStorage.getItem("lessons")) || [];

// Mảng tạm thời chứa kết quả sau khi lọc/tìm kiếm (dùng để render và phân trang)
let filteredLessons = lessons.slice(); // .slice() tạo bản sao, không ảnh hưởng mảng gốc

// Trang hiện tại (bắt đầu từ trang 1)
let currentPage = 1;

// Số bài học hiển thị tối đa trên mỗi trang
const pageSize = 5;

// Lưu ID của bài học đang được chọn để Xóa (null = chưa chọn)
let idDelete = null;

// Lưu ID của bài học đang được chọn để Sửa (null = chưa chọn)
let idEdit = null;


// ============================================================
// PHẦN 5: CHECKBOX "CHỌN TẤT CẢ" - Đổi trạng thái hàng loạt
// ============================================================

/**
 * Hàm getCurrentPageIds - Lấy danh sách ID của các bài học đang hiển thị trên trang hiện tại.
 * Cách hoạt động:
 *   1. Sao chép filteredLessons và sắp xếp A→Z theo tên (giống logic renderLesson)
 *   2. Tính chỉ số bắt đầu của trang hiện tại: start = (currentPage - 1) * pageSize
 *   3. Cắt mảng từ start đến start + pageSize, rồi lấy ra mảng các id
 */
const getCurrentPageIds = () => {
    // Sắp xếp A→Z theo tên bài học (localeCompare so sánh chuỗi có dấu đúng chuẩn Unicode)
    let sorted = filteredLessons.slice().sort((a, b) => a.name.localeCompare(b.name));

    // Tính vị trí bắt đầu của trang hiện tại trong mảng đã sắp xếp
    const start = (currentPage - 1) * pageSize;

    // Cắt lấy đúng các phần tử của trang hiện tại, rồi trả về mảng các id
    return sorted.slice(start, start + pageSize).map(item => item.id);
};

/**
 * Sự kiện "change" trên checkbox "Chọn tất cả" (<thead>).
 *
 * Khi người dùng tick/bỏ tick checkbox header:
 *   - Nếu tick (checked = true):  đặt status = "active" cho tất cả bài học trang hiện tại
 *   - Nếu bỏ tick (checked = false): đặt status = "inactive"
 *
 * Cập nhật ngay vào localStorage và render lại bảng.
 */
selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked; // true nếu vừa tick, false nếu bỏ tick
    const currentIds = getCurrentPageIds();       // Lấy ID các bài học trang hiện tại

    // [VÒNG LẶP] Duyệt qua từng ID trên trang hiện tại
    currentIds.forEach(id => {
        // Tìm đối tượng bài học tương ứng trong mảng lessons gốc
        const item = lessons.find(l => l.id === id);

        // [ĐIỀU KIỆN] Nếu tìm thấy thì cập nhật status:
        //   - isChecked = true  → status = "active"   (Đã hoàn thành)
        //   - isChecked = false → status = "inactive" (Chưa hoàn thành)
        if (item) item.status = isChecked ? "active" : "inactive";
    });

    // Lưu mảng lessons đã cập nhật vào localStorage dưới dạng JSON
    localStorage.setItem("lessons", JSON.stringify(lessons));

    // Render lại bảng theo kết quả lọc/tìm kiếm hiện tại
    filterAndSearchLessons();
});


// ============================================================
// PHẦN 6: XỬ LÝ ĐĂNG XUẤT
// ============================================================

/**
 * Sự kiện click vào avatar → toggle (ẩn/hiện) menu con "Đăng xuất".
 *
 * stopPropagation() ngăn sự kiện lan lên document để tránh bị đóng ngay lập tức
 * bởi listener "click" trên document bên dưới.
 */
avatarElement.addEventListener("click", (e) => {
    e.stopPropagation(); // Chặn sự kiện click lan ra ngoài (bubbling)

    // [ĐIỀU KIỆN] Dùng toán tử ba ngôi để toggle:
    //   - Nếu đang hiển thị ("block") → ẩn ("none")
    //   - Nếu đang ẩn → hiển thị ("block")
    logoutMenuElement.style.display =
        logoutMenuElement.style.display === "block" ? "none" : "block";
});

/**
 * Sự kiện click vào bất kỳ đâu trên document → tự động đóng menu con.
 * Cơ chế: vì avatarElement.stopPropagation(), click vào avatar KHÔNG kích hoạt listener này.
 * Chỉ khi click ra chỗ khác mới chạy, đảm bảo UX mượt mà.
 */
document.addEventListener("click", () => {
    logoutMenuElement.style.display = "none";
});

/**
 * Sự kiện click nút "Đăng xuất" trong menu con:
 *   1. Mở modal xác nhận đăng xuất
 *   2. Ẩn menu con
 */
logoutBtnElement.addEventListener("click", () => {
    openModal(modalLogoutElement);          // Mở hộp thoại xác nhận
    logoutMenuElement.style.display = "none"; // Đóng menu con
});

// Hàm tiện ích đóng modal đăng xuất (dùng cho nhiều nút)
const closeLogoutModal = () => closeModal(modalLogoutElement);

// Gán sự kiện đóng modal cho nút × và nút "Hủy"
closeLogoutElement.addEventListener("click", closeLogoutModal);
cancelLogoutElement.addEventListener("click", closeLogoutModal);

/**
 * Sự kiện click nút "Đăng xuất" (xác nhận) → chuyển hướng tới trang đăng ký/đăng nhập.
 */
confirmLogoutElement.addEventListener("click", () => {
    window.location.href = "./register.html"; // Chuyển trang
});


// ============================================================
// PHẦN 7: HIỂN THỊ DỮ LIỆU - Render bảng bài học
// ============================================================

/**
 * Hàm renderLesson - Vẽ lại toàn bộ <tbody> của bảng bài học theo dữ liệu đầu vào.
 * Cách hoạt động:
 *   1. Sắp xếp data theo tên A→Z
 *   2. Tính toán phân trang (trang hiện tại, số trang)
 *   3. Dùng forEach xây dựng chuỗi HTML
 *   4. Gán innerHTML vào <tbody>
 *   5. Gọi renderPagination để cập nhật thanh số trang
 */
const renderLesson = (data) => {
    let html = ""; // Chuỗi HTML tích lũy, ban đầu rỗng

    // Tạo bản sao để không làm thay đổi mảng gốc (immutability)
    let sortedData = data.slice();

    // Sắp xếp A→Z theo tên bài học dùng localeCompare (hỗ trợ tiếng Việt có dấu)
    sortedData.sort((a, b) => a.name.localeCompare(b.name));

    // --- Tính toán phân trang ---
    const totalPages = Math.ceil(sortedData.length / pageSize); // Tổng số trang (làm tròn lên)
    const start      = (currentPage - 1) * pageSize;            // Chỉ số phần tử đầu tiên của trang
    const end        = start + pageSize;                         // Chỉ số phần tử cuối (exclusive)
    const paginatedData = sortedData.slice(start, end);          // Cắt lấy đúng phần tử của trang

    // [VÒNG LẶP] Duyệt từng bài học của trang hiện tại để tạo HTML hàng <tr>
    paginatedData.forEach((item) => {
        // [ĐIỀU KIỆN] Xác định class CSS cho badge trạng thái
        let statusClass = item.status === "active" ? "st-active-status" : "st-inactive-status";

        // [ĐIỀU KIỆN] Xác định văn bản hiển thị cho trạng thái
        let statusText  = item.status === "active" ? "Đã hoàn thành" : "Chưa hoàn thành";

        // Xây dựng một hàng <tr> bằng template literal
        // - class "completed-row" chỉ được thêm nếu status === "active" (điều kiện ba ngôi)
        // - checkbox: checked nếu status === "active", khi thay đổi gọi handleToggleStatus(id)
        // - Badge trạng thái: click cũng gọi handleToggleStatus(id) để đổi trạng thái nhanh
        // - Nút xóa: gọi handleDelete(id)
        // - Nút sửa: gọi handleEdit(id)
        html += `
        <tr class="${item.status === "active" ? "completed-row" : ""}">
            <td><input type="checkbox" ${item.status === "active" ? "checked" : ""} onchange="handleToggleStatus(${item.id})"></td>
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td><span class="st-status ${statusClass}" onclick="handleToggleStatus(${item.id})" title="Click để đổi trạng thái">● ${statusText}</span></td>
            <td>
                <button class="btn-icon btn-icon-del" onclick="handleDelete(${item.id})" title="Xóa">
                    <img src="../assets/icons/Button (1).png" alt="Xóa">
                </button>
                <button class="btn-icon btn-icon-edit" onclick="handleEdit(${item.id})" title="Sửa">
                    <img src="../assets/icons/Button.png" alt="Sửa">
                </button>
            </td>
        </tr>
        `;
    });

    // Gán toàn bộ chuỗi HTML đã tích lũy vào <tbody>, thay thế nội dung cũ
    tableTbodyElement.innerHTML = html;

    // Render lại thanh phân trang dựa trên tổng số trang vừa tính
    renderPagination(totalPages);
};


// ============================================================
// PHẦN 8: PHÂN TRANG - Render thanh số trang thông minh
// ============================================================

/**
 * Hàm renderPagination - Tạo thanh phân trang với dấu "..." (ellipsis) khi có nhiều trang.
 *
 * Thuật toán:
 *   Bước 1: Xây dựng mảng `range` gồm các trang cần hiển thị:
 *     - Luôn hiển thị trang đầu (1) và trang cuối (totalPages)
 *     - Hiển thị các trang trong khoảng [currentPage - delta, currentPage + delta]
 *     - delta = 2 nghĩa là hiển thị 2 trang liền kề mỗi bên trang hiện tại
 *
 *   Bước 2: Xây dựng mảng `rangeWithDots` từ `range`, chèn "..." vào khoảng trống:
 *     - Nếu khoảng cách giữa 2 số liên tiếp = 2: chèn số ở giữa (vd: 3,5 → thêm 4)
 *     - Nếu khoảng cách > 2: chèn chuỗi "..."
 *
 *   Bước 3: Render HTML từ rangeWithDots
 *     - Số trang: thẻ <button> với class "active" nếu là trang hiện tại
 *     - "...": thẻ <span class="page-ellipsis">
 */
const renderPagination = (totalPages) => {
    let html = "";   // Chuỗi HTML tích lũy cho thanh phân trang
    const delta = 2; // Số trang hiển thị mỗi bên trang hiện tại

    const range         = []; // Mảng lưu các số trang được chọn hiển thị
    const rangeWithDots = []; // Mảng mở rộng có thêm "..." hoặc số bị bỏ qua
    let l;                    // Biến lưu phần tử cuối cùng đã xử lý (dùng để tính khoảng cách)

    // [VÒNG LẶP 1] Duyệt từ trang 1 đến trang cuối để chọn các trang cần hiển thị
    for (let i = 1; i <= totalPages; i++) {
        // [ĐIỀU KIỆN] Thêm trang i vào range nếu:
        //   - i là trang đầu tiên (i === 1)
        //   - i là trang cuối   (i === totalPages)
        //   - i nằm trong khoảng [currentPage - delta, currentPage + delta]
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            range.push(i);
        }
    }

    // [VÒNG LẶP 2] Duyệt qua range để chèn "..." giữa các khoảng trống
    for (let i of range) {
        // [ĐIỀU KIỆN] Chỉ kiểm tra khoảng cách nếu đã có phần tử trước đó (l tồn tại)
        if (l) {
            if (i - l === 2) {
                // Khoảng cách đúng 2: thay vì "..." thì hiển thị số ở giữa cho trực quan hơn
                // Ví dụ: range = [1, 3, ...] → rangeWithDots = [1, 2, 3]
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                // Khoảng cách > 2: có nhiều trang bị ẩn → chèn dấu "..." làm placeholder
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i); // Thêm số trang hiện tại vào kết quả
        l = i;                 // Cập nhật l = phần tử vừa xử lý
    }

    // [VÒNG LẶP 3] Duyệt rangeWithDots để tạo HTML button/span
    rangeWithDots.forEach(item => {
        // [ĐIỀU KIỆN] Nếu là dấu "..." → render thẻ <span> chỉ để đọc
        if (item === "...") {
            html += `<span class="page-ellipsis">…</span>`;
        } else {
            // Nếu là số trang → render thẻ <button>
            // Thêm class "active" nếu item là trang hiện tại (item === currentPage)
            // onclick gọi changePage(item) khi người dùng bấm
            html += `<button onclick="changePage(${item})" class="page-btn ${item === currentPage ? 'active' : ''}">${item}</button>`;
        }
    });

    // Cập nhật nội dung vùng chứa số trang
    buttonNumberElement.innerHTML = html;

    // Disable nút "←" nếu đang ở trang đầu
    btnPrev.disabled = currentPage === 1;

    // Disable nút "→" nếu đang ở trang cuối HOẶC không có trang nào
    btnNext.disabled = currentPage === totalPages || totalPages === 0;
};

/**
 * Hàm changePage - Chuyển sang trang khác.
 *
 * [ĐIỀU KIỆN] Kiểm tra hợp lệ: page phải trong khoảng [1, totalPages].
 * Nếu hợp lệ: cập nhật currentPage và render lại bảng.
 */
const changePage = (page) => {
    const totalPages = Math.ceil(filteredLessons.length / pageSize);

    // [ĐIỀU KIỆN] Guard clause: trang không hợp lệ → thoát ngay
    if (page < 1 || page > totalPages) return;

    currentPage = page;            // Cập nhật trang hiện tại
    renderLesson(filteredLessons); // Render lại bảng với dữ liệu đã lọc
};

// Nút ← bấm → chuyển về trang trước (currentPage - 1)
btnPrev.addEventListener("click", () => changePage(currentPage - 1));

// Nút → bấm → chuyển sang trang tiếp (currentPage + 1)
btnNext.addEventListener("click", () => changePage(currentPage + 1));


// ============================================================
// PHẦN 9: BỘ LỌC & TÌM KIẾM - Lọc kép theo trạng thái + môn học + từ khóa
// ============================================================

/**
 * Hàm filterAndSearchLessons - Lọc và tìm kiếm, sau đó render lại bảng.
 *
 * Thứ tự lọc:
 *   1. Lọc theo trạng thái (filterStatusElement): all / active / inactive
 *   2. Lọc tiếp theo từ khóa tên bài học (searchInputElement)
 *   3. Lọc tiếp theo môn học (filterSubjectElement)
 *
 * Sau mỗi thao tác lọc, reset về trang 1 và render lại bảng.
 */
const filterAndSearchLessons = () => {
    let statusValue  = filterStatusElement.value;                      // Giá trị bộ lọc trạng thái
    let subjectValue = filterSubjectElement.value;                     // Giá trị bộ lọc môn học
    let searchValue  = searchInputElement.value.toLowerCase().trim();  // Từ khóa tìm kiếm (đã chuẩn hóa)

    // --- Bước 1: Lọc theo trạng thái ---
    // [ĐIỀU KIỆN] Nếu chọn "Tất cả" (value = "all") → lấy toàn bộ lessons
    //             Ngược lại → chỉ giữ lại các phần tử có status khớp
    if (statusValue === "all") {
        filteredLessons = lessons.slice(); // Sao chép toàn bộ mảng gốc
    } else {
        // .filter() trả về mảng mới chỉ chứa các phần tử thỏa mãn điều kiện
        filteredLessons = lessons.filter(item => item.status === statusValue);
    }

    // --- Bước 2: Lọc theo từ khóa tên bài học ---
    // [ĐIỀU KIỆN] Chỉ lọc nếu người dùng có nhập từ khóa (searchValue khác rỗng)
    if (searchValue !== "") {
        // .toLowerCase() để so sánh không phân biệt hoa/thường
        // .includes() kiểm tra từ khóa có xuất hiện trong tên hay không
        filteredLessons = filteredLessons.filter(
            item => item.name.toLowerCase().includes(searchValue)
        );
    }

    // --- Bước 3: Lọc theo môn học ---
    // [ĐIỀU KIỆN] Chỉ lọc nếu không chọn "Tất cả" (value khác "all")
    if (subjectValue !== "all") {
        filteredLessons = filteredLessons.filter(item => item.subject === subjectValue);
    }

    // Reset về trang 1 mỗi khi lọc để tránh "trang trắng"
    currentPage = 1;

    // Render lại bảng với kết quả lọc mới
    renderLesson(filteredLessons);
};

// Lắng nghe sự kiện: khi người dùng gõ vào ô tìm kiếm → lọc ngay lập tức
searchInputElement.addEventListener("input", filterAndSearchLessons);

// Lắng nghe sự kiện: khi người dùng đổi bộ lọc trạng thái → lọc ngay lập tức
filterStatusElement.addEventListener("change", filterAndSearchLessons);

// Lắng nghe sự kiện: khi người dùng đổi bộ lọc môn học → lọc ngay lập tức
filterSubjectElement.addEventListener("change", filterAndSearchLessons);


// ============================================================
// PHẦN 10: THÊM MỚI BÀI HỌC
// ============================================================

// Click nút "Thêm mới" trên trang chính → mở modal thêm mới
btnAddSubjectElemeent.addEventListener("click", () => openModal(modalAddElement));

/**
 * Hàm resetAddForm - Reset toàn bộ form thêm mới về trạng thái ban đầu.
 *
 * Xóa giá trị các input, xóa thông báo lỗi, đóng modal.
 * Được gọi khi người dùng click "×" hoặc "Hủy" trong modal thêm mới.
 */
const resetAddForm = () => {
    nameSubjectInputElement.value  = ""; // Xóa nội dung input tên bài học
    numberInputElement.value       = ""; // Xóa nội dung input thời lượng
    subjectNameSelectElement.value = ""; // Đặt dropdown về tùy chọn đầu tiên (rỗng)
    errNameSubjectElement.textContent  = ""; // Xóa thông báo lỗi tên
    errNumberSubjectElement.textContent= ""; // Xóa thông báo lỗi thời lượng
    errSubjectElement.textContent      = ""; // Xóa thông báo lỗi môn học
    closeModal(modalAddElement);             // Đóng modal
};

// Nút × và nút "Hủy" đều gọi resetAddForm
modalCloseIcon.addEventListener("click", resetAddForm);
modalCloseCancel.addEventListener("click", resetAddForm);

/**
 * Sự kiện click nút "Thêm" trong modal → validate và thêm bài học mới.
 *
 * Luồng xử lý:
 *   1. Lấy giá trị từ các ô input
 *   2. Validate từng trường: không rỗng, không trùng tên, thời lượng > 0
 *   3. Nếu isValid = false → hiển thị lỗi và return (không thêm)
 *   4. Nếu hợp lệ → thêm object mới vào mảng lessons, lưu localStorage, cập nhật UI
 */
btnAddLesson.addEventListener("click", () => {
    // Lấy và làm sạch dữ liệu từ form
    let name       = nameSubjectInputElement.value.trim(); // Xóa khoảng trắng đầu/cuối
    let timeValue  = numberInputElement.value;             // Chuỗi từ input number
    let time       = Number(timeValue);                    // Chuyển sang kiểu số để validate
    let status     = "inactive";                           // Mặc định bài học mới = chưa hoàn thành
    let subject    = subjectNameSelectElement.value;       // Môn học được chọn
    let isValid    = true;                                 // Cờ hợp lệ, mặc định true

    // Kiểm tra trùng tên (so sánh không phân biệt hoa/thường)
    let nameExist = lessons.find(item => item.name.toLowerCase() === name.toLowerCase());

    // --- Validate tên bài học ---
    // [ĐIỀU KIỆN] Chuỗi rỗng → báo lỗi "không được để trống"
    if (!name) {
        errNameSubjectElement.textContent = "Không được để trống";
        isValid = false;
    } else if (nameExist) {
        // [ĐIỀU KIỆN] Tên đã tồn tại → báo lỗi "tên bị trùng"
        errNameSubjectElement.textContent = "Tên bị trùng";
        isValid = false;
    } else {
        errNameSubjectElement.textContent = ""; // Xóa lỗi nếu hợp lệ
    }

    // --- Validate môn học ---
    // [ĐIỀU KIỆN] Chưa chọn môn học (value rỗng) → báo lỗi
    if (!subject) {
        errSubjectElement.textContent = "Không được để trống";
        isValid = false;
    } else {
        errSubjectElement.textContent = ""; // Xóa lỗi nếu hợp lệ
    }

    // --- Validate thời lượng ---
    // [ĐIỀU KIỆN] Chuỗi rỗng → báo lỗi không để trống
    if (timeValue === "") {
        errNumberSubjectElement.textContent = "Không được để trống";
        isValid = false;
    } else if (time <= 0) {
        // [ĐIỀU KIỆN] Giá trị ≤ 0 (số âm hoặc 0) → báo lỗi phải > 0
        errNumberSubjectElement.textContent = "Phải > 0";
        isValid = false;
    } else {
        errNumberSubjectElement.textContent = ""; // Xóa lỗi nếu hợp lệ
    }

    // [ĐIỀU KIỆN] Nếu có bất kỳ lỗi nào → dừng xử lý, không thêm bài học
    if (!isValid) return;

    // Tạo object bài học mới và thêm vào mảng lessons
    // id = Date.now() + số ngẫu nhiên → đảm bảo id là duy nhất (unique)
    lessons.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,    // Shorthand property: name: name
        time,    // Shorthand property: time: time
        status,  // Shorthand property: status: status
        subject  // Shorthand property: subject: subject
    });

    // Lưu mảng lessons cập nhật vào localStorage dưới dạng JSON
    localStorage.setItem("lessons", JSON.stringify(lessons));

    renderSubjectFilter();    // Cập nhật dropdown bộ lọc môn học
    filterAndSearchLessons(); // Render lại bảng theo bộ lọc hiện tại
    closeModal(modalAddElement); // Đóng modal thêm mới

    showToast("Thành công", "Thêm bài học thành công"); // Hiển thị thông báo

    // Reset form sau khi thêm thành công
    nameSubjectInputElement.value  = "";
    numberInputElement.value       = "";
    subjectNameSelectElement.value = "";
});


// ============================================================
// PHẦN 11: XÓA BÀI HỌC
// ============================================================

/**
 * Hàm handleDelete - Mở modal xác nhận xóa cho một bài học cụ thể.
 * Lưu id vào biến toàn cục `idDelete` để dùng khi người dùng xác nhận xóa.
 * Hiển thị tên bài học trong modal để người dùng xác nhận đúng mục.
 */
const handleDelete = (id) => {
    idDelete = id; // Lưu lại ID để dùng trong sự kiện btnDeleteElement

    // Tìm đối tượng bài học theo id
    let lesson = lessons.find(item => item.id === id);

    // Hiển thị tên bài học vào modal (nếu không tìm thấy thì hiển thị chuỗi rỗng)
    subjectTextElement.textContent = lesson ? lesson.name : "";

    openModal(modalDeleteElement); // Mở hộp thoại xác nhận xóa
};

// Nút "Hủy" trong modal xóa → đóng modal, không xóa gì cả
btnDeleteCancelElement.addEventListener("click", () => closeModal(modalDeleteElement));

/**
 * Sự kiện click nút "Xóa" (xác nhận) trong modal:
 *   1. Lọc ra mảng mới không chứa phần tử có id === idDelete (.filter trả về mảng mới)
 *   2. Lưu lại vào localStorage
 *   3. Cập nhật UI: render lại bảng, cập nhật dropdown, đóng modal, toast thành công
 */
btnDeleteElement.addEventListener("click", () => {
    // .filter() tạo mảng mới loại bỏ bài học có id trùng với idDelete
    lessons = lessons.filter(item => item.id !== idDelete);

    // Lưu mảng đã cập nhật vào localStorage
    localStorage.setItem("lessons", JSON.stringify(lessons));

    filterAndSearchLessons();     // Render lại bảng
    closeModal(modalDeleteElement); // Đóng modal
    renderSubjectFilter();         // Cập nhật dropdown môn học
    showToast("Thành công", "Xóa bài học thành công"); // Thông báo
});


// ============================================================
// PHẦN 12: SỬA BÀI HỌC
// ============================================================

/**
 * Hàm handleEdit - Mở modal chỉnh sửa và điền sẵn dữ liệu của bài học cần sửa.
 * Cách hoạt động:
 *   1. Lưu id vào biến toàn cục `idEdit`
 *   2. Tìm đối tượng bài học trong mảng lessons
 *   3. Điền dữ liệu hiện tại vào các ô input/select/radio trong modal
 *   4. Xóa các thông báo lỗi cũ
 *   5. Mở modal
 */
const handleEdit = (id) => {
    idEdit = id; // Lưu ID để dùng khi lưu (btnEditSaveElement)

    // Tìm đối tượng bài học cần sửa trong mảng
    let lesson = lessons.find(item => item.id === id);

    renderSubjectFilter();                         // Cập nhật dropdown môn học trước khi điền

    // Điền dữ liệu hiện tại của bài học vào form
    editNameInputElement.value     = lesson.name;    // Tên bài học
    editNumberInputElement.value   = lesson.time;    // Thời lượng (phút)
    subjectNameEditElement.value   = lesson.subject; // Môn học đang được chọn

    // [VÒNG LẶP] Duyệt qua tất cả radio button trạng thái
    // Đặt checked = true cho radio có value khớp với trạng thái hiện tại của bài học
    statusEditRadios.forEach(radio => radio.checked = (radio.value === lesson.status));

    // Xóa tất cả thông báo lỗi còn sót từ lần mở modal trước
    errnameEditElement.textContent    = "";
    errNumberEditElement.textContent  = "";
    errSubjectEditElement.textContent = "";

    openModal(modalEditElement); // Mở hộp thoại chỉnh sửa
};

// Nút "Hủy" và nút × trong modal sửa → đóng modal
btnEditCancelElement.addEventListener("click", () => closeModal(modalEditElement));
modalIconEdit.addEventListener("click", () => closeModal(modalEditElement));

/**
 * Sự kiện click nút "Lưu" trong modal sửa → validate và cập nhật bài học.
 *
 * Logic validate tương tự modal thêm mới, nhưng khi kiểm tra trùng tên:
 *   - Bỏ qua chính bài học đang sửa (item.id !== idEdit)
 *   - Chỉ báo lỗi nếu tên trùng với bài học KHÁC
 *
 * Sau khi validate xong:
 *   - Tìm radio được chọn để lấy trạng thái mới
 *   - Tìm object bài học trong mảng và cập nhật trực tiếp (mutation)
 *   - Lưu lại localStorage và render lại UI
 */
btnEditSaveElement.addEventListener("click", () => {
    let newName      = editNameInputElement.value.trim(); // Tên mới (đã trim)
    let newTimeValue = editNumberInputElement.value;       // Thời lượng mới (chuỗi)
    let newTime      = Number(newTimeValue);               // Chuyển sang số
    let newSubject   = subjectNameEditElement.value;       // Môn học mới
    let isValid      = true;                               // Cờ hợp lệ

    // Kiểm tra trùng tên với bài học KHÁC (loại trừ bài học đang sửa qua item.id !== idEdit)
    let nameExist = lessons.find(
        item => item.id !== idEdit && item.name.toLowerCase() === newName.toLowerCase()
    );

    // --- Validate tên ---
    if (!newName) {
        errnameEditElement.textContent = "Không được để trống";
        isValid = false;
    } else if (nameExist) {
        errnameEditElement.textContent = "Tên bị trùng";
        isValid = false;
    } else {
        errnameEditElement.textContent = "";
    }

    // --- Validate môn học ---
    if (!newSubject) {
        errSubjectEditElement.textContent = "Không được để trống";
        isValid = false;
    } else {
        errSubjectEditElement.textContent = "";
    }

    // --- Validate thời lượng ---
    if (newTimeValue === "") {
        errNumberEditElement.textContent = "Không được để trống";
        isValid = false;
    } else if (newTime <= 0) {
        errNumberEditElement.textContent = "Phải > 0";
        isValid = false;
    } else {
        errNumberEditElement.textContent = "";
    }

    // [ĐIỀU KIỆN] Nếu có lỗi → dừng, không lưu
    if (!isValid) return;

    // Tìm trạng thái được chọn từ nhóm radio button
    let newStatus = "";
    // [VÒNG LẶP] Duyệt qua từng radio, lấy value của radio đang được checked
    statusEditRadios.forEach(radio => {
        if (radio.checked) newStatus = radio.value;
    });

    // Tìm object bài học trong mảng và cập nhật trực tiếp (không tạo object mới)
    let itemEdit = lessons.find(item => item.id === idEdit);
    // [ĐIỀU KIỆN] Chỉ cập nhật nếu tìm thấy bài học (tránh lỗi null)
    if (itemEdit) {
        itemEdit.name    = newName;
        itemEdit.time    = newTime;
        itemEdit.status  = newStatus;
        itemEdit.subject = newSubject;
    }

    // Lưu vào localStorage
    localStorage.setItem("lessons", JSON.stringify(lessons));

    filterAndSearchLessons();     // Render lại bảng
    closeModal(modalEditElement); // Đóng modal
    showToast("Thành công", "Cập nhật bài học thành công"); // Thông báo
});


// ============================================================
// PHẦN 13: TOGGLE TRẠNG THÁI (click nhanh trên badge hoặc checkbox)
// ============================================================

/**
 * Hàm handleToggleStatus - Đổi nhanh trạng thái của một bài học.
 * [ĐIỀU KIỆN] Nếu đang "active" → chuyển sang "inactive" (và ngược lại).
 * Dùng toán tử ba ngôi cho gọn.
 * Sau đó lưu localStorage và render lại toàn bộ UI.
 */
const handleToggleStatus = (id) => {
    // Tìm bài học theo id
    const item = lessons.find(item => item.id === id);

    // [ĐIỀU KIỆN] Guard clause: không tìm thấy → thoát ngay
    if (!item) return;

    // Đảo trạng thái: "active" ↔ "inactive"
    item.status = item.status === "active" ? "inactive" : "active";

    // Lưu thay đổi vào localStorage
    localStorage.setItem("lessons", JSON.stringify(lessons));

    renderSubjectFilter();    // Cập nhật dropdown (thống kê số lượng có thể thay đổi)
    filterAndSearchLessons(); // Render lại bảng
};


// ============================================================
// PHẦN 14: RENDER DROPDOWN MÔN HỌC
// ============================================================

/**
 * Hàm renderSubjectFilter - Cập nhật tất cả các dropdown liên quan đến môn học.
 *
 * Các dropdown được cập nhật:
 *   1. filterSubjectElement:   Dropdown "Lọc theo môn học" trên trang chính
 *   2. subjectNameSelectElement: Dropdown trong modal Thêm mới
 *   3. subjectNameEditElement:   Dropdown trong modal Sửa
 *
 * Nguồn dữ liệu: lấy danh sách môn học duy nhất từ trường `subject` trong mảng lessons.
 *
 * Cách lấy danh sách môn duy nhất:
 *   - .map(item => item.subject)  → lấy mảng tất cả môn học (có thể trùng)
 *   - .filter(Boolean)            → loại bỏ giá trị null, undefined, ""
 *   - new Set(...)                → loại bỏ phần tử trùng lặp (Set chỉ chứa giá trị duy nhất)
 *   - [...new Set(...)]           → chuyển Set thành Array để dùng forEach
 */
const renderSubjectFilter = () => {
    // Lấy danh sách các môn học duy nhất từ mảng lessons
    let subjects = [...new Set(lessons.map(item => item.subject).filter(Boolean))];

    // --- Cập nhật dropdown lọc ngoài bảng ---
    let filterHtml = `<option value="all">Lọc theo môn học</option>`; // Option mặc định
    // [VÒNG LẶP] Thêm một <option> cho mỗi môn học
    subjects.forEach(subject => {
        filterHtml += `<option value="${subject}">${subject}</option>`;
    });
    filterSubjectElement.innerHTML = filterHtml; // Gán vào dropdown bộ lọc

    // --- Cập nhật dropdown trong modal Thêm mới và modal Sửa ---
    let selectHtml = `<option value="">-- Chọn môn học --</option>`; // Option mặc định
    // [VÒNG LẶP] Thêm một <option> cho mỗi môn học
    subjects.forEach(subject => {
        selectHtml += `<option value="${subject}">${subject}</option>`;
    });
    subjectNameSelectElement.innerHTML = selectHtml; // Gán vào dropdown modal thêm
    subjectNameEditElement.innerHTML   = selectHtml; // Gán vào dropdown modal sửa
};


// ============================================================
// PHẦN 15: KHỞI TẠO - Chạy lần đầu khi trang load
// ============================================================

// Gọi renderSubjectFilter trước để dropdown môn học có dữ liệu ngay khi mở trang
renderSubjectFilter();

// Gọi filterAndSearchLessons để hiển thị toàn bộ bài học lên bảng ngay lập tức
filterAndSearchLessons();