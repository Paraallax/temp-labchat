/* ==========================================
   LABCHAT ADMIN — SUPABASE
========================================== */

const SUPABASE_URL =
    "https://izobeyuplyramoojazdg.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_fftKRus4w4NXriH07kWvQg_Up9qWpy6";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* ==========================================
   STATE
========================================== */

let currentAdmin = null;
let currentProfile = null;

let users = [];
let editingUserId = null;

let accessCodes = [];
let accessCodeUsers = [];
let editingAccessCodeId = null;

let pdfDocuments = [];
let editingPDFId = null;


/* ==========================================
   COMMON DOM
========================================== */

const loadingScreen =
    document.getElementById("loadingScreen");

const adminApp =
    document.getElementById("adminApp");

const adminName =
    document.getElementById("adminName");

const logoutButton =
    document.getElementById("logoutButton");

const totalUsers =
    document.getElementById("totalUsers");

const activeUsers =
    document.getElementById("activeUsers");

const onlineUsers =
    document.getElementById("onlineUsers");

const totalMessages =
    document.getElementById("totalMessages");

const usersTableBody =
    document.getElementById("usersTableBody");

const userSearch =
    document.getElementById("userSearch");

const refreshUsersButton =
    document.getElementById("refreshUsersButton");


/* ==========================================
   ACCESS CODE DOM
========================================== */

const accessCodesSection =
    document.getElementById(
        "accessCodesSection"
    );

const accessCodesTableBody =
    document.getElementById(
        "accessCodesTableBody"
    );

const accessCodeSearch =
    document.getElementById(
        "accessCodeSearch"
    );

const refreshAccessCodesButton =
    document.getElementById(
        "refreshAccessCodesButton"
    );

const createAccessCodeButton =
    document.getElementById(
        "createAccessCodeButton"
    );

const accessCodeOverlay =
    document.getElementById(
        "accessCodeOverlay"
    );

const accessCodeForm =
    document.getElementById(
        "accessCodeForm"
    );

const accessCodeId =
    document.getElementById(
        "accessCodeId"
    );

const accessCodeUser =
    document.getElementById(
        "accessCodeUser"
    );

const accessCodeValue =
    document.getElementById(
        "accessCodeValue"
    );

const accessCodeExpiry =
    document.getElementById(
        "accessCodeExpiry"
    );

const accessCodeModalTitle =
    document.getElementById(
        "accessCodeModalTitle"
    );

const accessCodeModalSubtitle =
    document.getElementById(
        "accessCodeModalSubtitle"
    );

const accessCodeMessage =
    document.getElementById(
        "accessCodeMessage"
    );

const saveAccessCodeButton =
    document.getElementById(
        "saveAccessCodeButton"
    );

const generateAccessCodeButton =
    document.getElementById(
        "generateAccessCodeButton"
    );

const closeAccessCodeModal =
    document.getElementById(
        "closeAccessCodeModal"
    );

const cancelAccessCodeButton =
    document.getElementById(
        "cancelAccessCodeButton"
    );

const newAccessCodeOverlay =
    document.getElementById(
        "newAccessCodeOverlay"
    );

const newAccessCodeUser =
    document.getElementById(
        "newAccessCodeUser"
    );

const newAccessCodeValue =
    document.getElementById(
        "newAccessCodeValue"
    );

const copyNewAccessCodeButton =
    document.getElementById(
        "copyNewAccessCodeButton"
    );

const closeNewAccessCodeModal =
    document.getElementById(
        "closeNewAccessCodeModal"
    );

const newAccessCodeMessage =
    document.getElementById(
        "newAccessCodeMessage"
    );


/* ==========================================
   PDF MANAGEMENT DOM
========================================== */

const pdfSection =
    document.getElementById(
        "pdfSection"
    );

const pdfTableBody =
    document.getElementById(
        "pdfTableBody"
    );

const pdfSearch =
    document.getElementById(
        "pdfSearch"
    );

const refreshPDFButton =
    document.getElementById(
        "refreshPDFButton"
    );

const addPDFButton =
    document.getElementById(
        "addPDFButton"
    );

const pdfOverlay =
    document.getElementById(
        "pdfOverlay"
    );

const pdfForm =
    document.getElementById(
        "pdfForm"
    );

const pdfId =
    document.getElementById(
        "pdfId"
    );

const pdfTitle =
    document.getElementById(
        "pdfTitle"
    );

const pdfFileName =
    document.getElementById(
        "pdfFileName"
    );

const pdfGithubPath =
    document.getElementById(
        "pdfGithubPath"
    );

const pdfGithubUrl =
    document.getElementById(
        "pdfGithubUrl"
    );

const pdfSetActive =
    document.getElementById(
        "pdfSetActive"
    );

const pdfModalTitle =
    document.getElementById(
        "pdfModalTitle"
    );

const pdfModalSubtitle =
    document.getElementById(
        "pdfModalSubtitle"
    );

const pdfMessage =
    document.getElementById(
        "pdfMessage"
    );

const savePDFButton =
    document.getElementById(
        "savePDFButton"
    );

const closePDFModal =
    document.getElementById(
        "closePDFModal"
    );

const cancelPDFButton =
    document.getElementById(
        "cancelPDFButton"
    );


/* ==========================================
   NAVIGATION
========================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const sectionButtons =
    document.querySelectorAll(
        "[data-section]"
    );

const dashboardSection =
    document.getElementById(
        "dashboardSection"
    );

const usersSection =
    document.getElementById(
        "usersSection"
    );

const createUserSection =
    document.getElementById(
        "createUserSection"
    );

const pageTitle =
    document.getElementById(
        "pageTitle"
    );

const pageSubtitle =
    document.getElementById(
        "pageSubtitle"
    );


/* ==========================================
   CREATE USER DOM
========================================== */

const createUserForm =
    document.getElementById(
        "createUserForm"
    );

const newUserEmail =
    document.getElementById(
        "newUserEmail"
    );

const newUserUsername =
    document.getElementById(
        "newUserUsername"
    );

const newUserPassword =
    document.getElementById(
        "newUserPassword"
    );

const newUserRole =
    document.getElementById(
        "newUserRole"
    );

const createUserButton =
    document.getElementById(
        "createUserButton"
    );

const createUserMessage =
    document.getElementById(
        "createUserMessage"
    );


/* ==========================================
   EDIT USER DOM
========================================== */

const editUserOverlay =
    document.getElementById(
        "editUserOverlay"
    );

const editUserForm =
    document.getElementById(
        "editUserForm"
    );

const editUserId =
    document.getElementById(
        "editUserId"
    );

const editUsername =
    document.getElementById(
        "editUsername"
    );

const editRole =
    document.getElementById(
        "editRole"
    );

const editStatus =
    document.getElementById(
        "editStatus"
    );

const editUserMessage =
    document.getElementById(
        "editUserMessage"
    );

const closeEditModal =
    document.getElementById(
        "closeEditModal"
    );

const cancelEditButton =
    document.getElementById(
        "cancelEditButton"
    );


/* ==========================================
   INITIALIZE
========================================== */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeAdmin,
        { once: true }
    );
} else {
    void initializeAdmin();
}

async function initializeAdmin() {

    try {

        console.log(
            "LabChat Admin: initializing..."
        );


        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            redirectToLogin();

            return;
        }


        if (!data?.session) {

            console.log(
                "No admin session found."
            );

            redirectToLogin();

            return;
        }


        currentAdmin =
            data.session.user;


        console.log(
            "Authenticated user:",
            currentAdmin.id
        );


        const verified =
            await verifyAdmin();


        if (!verified) {
            return;
        }


        if (loadingScreen) {

            loadingScreen.classList.add(
                "hidden"
            );
        }


        if (adminApp) {

            adminApp.classList.remove(
                "hidden"
            );
        }


        console.log(
            "LabChat Admin: ready."
        );

    } catch (error) {

        console.error(
            "Admin initialization error:",
            error
        );

        redirectToLogin();
    }
}


/* ==========================================
   VERIFY ADMIN
========================================== */

async function verifyAdmin() {

    if (!currentAdmin) {

        redirectToLogin();

        return false;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, username, role, is_active, created_at"
            )
            .eq(
                "id",
                currentAdmin.id
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Profile lookup error:",
            error
        );

        redirectToLogin();

        return false;
    }


    if (!data) {

        console.error(
            "No profile found for user."
        );


        await supabaseClient
            .auth
            .signOut();


        redirectToLogin();

        return false;
    }


    currentProfile =
        data;


    if (
        currentProfile.role !==
        "admin"
    ) {

        console.error(
            "Admin access denied."
        );


        await supabaseClient
            .auth
            .signOut();


        redirectToLogin();

        return false;
    }


    if (
        currentProfile.is_active ===
        false
    ) {

        console.error(
            "Admin account is inactive."
        );


        await supabaseClient
            .auth
            .signOut();


        redirectToLogin();

        return false;
    }


    updateAdminIdentity();

    await loadUsers();

    updateDashboardStats();

    return true;
}


/* ==========================================
   ADMIN IDENTITY
========================================== */

function updateAdminIdentity() {

    if (!adminName) {
        return;
    }


    adminName.textContent =
        currentProfile.username ||
        currentAdmin.email ||
        "Admin";
}


/* ==========================================
   NAVIGATION
========================================== */

sectionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;


                if (!section) {
                    return;
                }


                showSection(
                    section
                );
            }
        );
    }
);


function showSection(
    section
) {

    dashboardSection?.classList.add(
        "hidden"
    );

    usersSection?.classList.add(
        "hidden"
    );

    createUserSection?.classList.add(
        "hidden"
    );

    accessCodesSection?.classList.add(
        "hidden"
    );

    pdfSection?.classList.add(
        "hidden"
    );


    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );
        }
    );


    if (
        section ===
        "dashboard"
    ) {

        dashboardSection?.classList.remove(
            "hidden"
        );


        setPageHeader(
            "Dashboard",
            "Manage your LabChat system."
        );

    }


    else if (
        section ===
        "users"
    ) {

        usersSection?.classList.remove(
            "hidden"
        );


        setPageHeader(
            "Users",
            "Manage LabChat accounts."
        );


        loadUsers();

    }


    else if (
        section ===
        "create-user"
    ) {

        createUserSection?.classList.remove(
            "hidden"
        );


        setPageHeader(
            "Create User",
            "Create a new LabChat account."
        );

    }


    else if (
        section ===
        "access-codes"
    ) {

        accessCodesSection?.classList.remove(
            "hidden"
        );


        setPageHeader(
            "Access Codes",
            "Manage LabChat access credentials."
        );


        loadAccessCodes();

    }


    else if (
        section ===
        "pdfs"
    ) {

        pdfSection?.classList.remove(
            "hidden"
        );


        setPageHeader(
            "PDF Management",
            "Manage and switch the active LabChat PDF."
        );


        loadPDFDocuments();

    }


    navItems.forEach(
        item => {

            if (
                item.dataset.section ===
                section
            ) {

                item.classList.add(
                    "active"
                );
            }
        }
    );
}


function setPageHeader(
    title,
    subtitle
) {

    if (pageTitle) {

        pageTitle.textContent =
            title;
    }


    if (pageSubtitle) {

        pageSubtitle.textContent =
            subtitle;
    }
}


/* ==========================================
   USERS
========================================== */

async function loadUsers() {

    if (!usersTableBody) {
        return;
    }


    showLoading();


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, username, role, is_active, created_at"
            )
            .order(
                "created_at",
                {
                    ascending:
                        false
                }
            );


    if (error) {

        console.error(
            "Load users error:",
            error
        );


        showTableMessage(
            "Could not load users."
        );


        return;
    }


    users =
        data || [];


    renderUsers(
        users
    );


    updateDashboardStats();
}


function renderUsers(
    list
) {

    if (!usersTableBody) {
        return;
    }


    usersTableBody.innerHTML =
        "";


    if (
        !list ||
        list.length === 0
    ) {

        showTableMessage(
            "No users found."
        );


        return;
    }


    list.forEach(
        user => {

            const row =
                document.createElement(
                    "tr"
                );


            const userCell =
                document.createElement(
                    "td"
                );


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "user-cell";


            const avatar =
                document.createElement(
                    "div"
                );


            avatar.className =
                "user-avatar";


            avatar.textContent =
                getInitials(
                    user.username ||
                    "U"
                );


            const identity =
                document.createElement(
                    "div"
                );


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "user-name";


            name.textContent =
                user.username ||
                "Unknown";


            const email =
                document.createElement(
                    "div"
                );


            email.className =
                "user-email";


            if (
                user.id ===
                currentAdmin?.id
            ) {

                email.textContent =
                    currentAdmin.email ||
                    "";
            }


            identity.appendChild(
                name
            );


            identity.appendChild(
                email
            );


            wrapper.appendChild(
                avatar
            );


            wrapper.appendChild(
                identity
            );


            userCell.appendChild(
                wrapper
            );


            const roleCell =
                document.createElement(
                    "td"
                );


            const roleBadge =
                document.createElement(
                    "span"
                );


            roleBadge.className =
                `role-badge ${
                    user.role === "admin"
                        ? "role-admin"
                        : "role-user"
                }`;


            roleBadge.textContent =
                user.role ||
                "user";


            roleCell.appendChild(
                roleBadge
            );


            const statusCell =
                document.createElement(
                    "td"
                );


            const statusBadge =
                document.createElement(
                    "span"
                );


            const isActive =
                user.is_active !== false;


            statusBadge.className =
                `status-badge ${
                    isActive
                        ? "status-active"
                        : "status-inactive"
                }`;


            statusBadge.textContent =
                isActive
                    ? "Active"
                    : "Inactive";


            statusCell.appendChild(
                statusBadge
            );


            const createdCell =
                document.createElement(
                    "td"
                );


            createdCell.textContent =
                formatDate(
                    user.created_at
                );


            const actionsCell =
                document.createElement(
                    "td"
                );


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "table-actions";


            const editButton =
                document.createElement(
                    "button"
                );


            editButton.type =
                "button";


            editButton.className =
                "action-button";


            editButton.textContent =
                "Edit";


            editButton.addEventListener(
                "click",
                () => {

                    openEditModal(
                        user
                    );
                }
            );


            const statusButton =
                document.createElement(
                    "button"
                );


            statusButton.type =
                "button";


            statusButton.className =
                `action-button ${
                    isActive
                        ? "danger"
                        : "success"
                }`;


            statusButton.textContent =
                isActive
                    ? "Deactivate"
                    : "Activate";


            statusButton.addEventListener(
                "click",
                () => {

                    void toggleUserStatus(
                        user
                    ).catch(
                        error => {

                            console.error(
                                "Status update error:",
                                error
                            );

                            window.alert(
                                getSupabaseErrorMessage(
                                    error
                                )
                            );
                        }
                    );
                }
            );


            if (
                user.id ===
                currentAdmin?.id
            ) {

                statusButton.disabled =
                    true;


                statusButton.title =
                    "You cannot deactivate yourself.";
            }


            actions.appendChild(
                editButton
            );


            actions.appendChild(
                statusButton
            );


            actionsCell.appendChild(
                actions
            );


            row.appendChild(
                userCell
            );


            row.appendChild(
                roleCell
            );


            row.appendChild(
                statusCell
            );


            row.appendChild(
                createdCell
            );


            row.appendChild(
                actionsCell
            );


            usersTableBody.appendChild(
                row
            );
        }
    );
}


/* ==========================================
   USER SEARCH
========================================== */

if (userSearch) {

    userSearch.addEventListener(
        "input",
        () => {

            const query =
                userSearch.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                renderUsers(
                    users
                );


                return;
            }


            const filtered =
                users.filter(
                    user => {

                        return (
                            String(
                                user.username ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            String(
                                user.role ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )
                        );
                    }
                );


            renderUsers(
                filtered
            );
        }
    );
}


/* ==========================================
   REFRESH USERS
========================================== */

if (refreshUsersButton) {

    refreshUsersButton.addEventListener(
        "click",
        () => {

            loadUsers();
        }
    );
}


/* ==========================================
   DASHBOARD
========================================== */

function updateDashboardStats() {

    if (!Array.isArray(users)) {
        return;
    }


    const activeCount =
        users.filter(
            user =>
                user.is_active !== false
        ).length;


    if (totalUsers) {

        totalUsers.textContent =
            users.length;
    }


    if (activeUsers) {

        activeUsers.textContent =
            activeCount;
    }


    void loadOnlineUserCount();


    if (totalMessages) {

        void loadTotalMessages();
    }
}


async function loadOnlineUserCount() {

    if (!onlineUsers) {
        return;
    }


    const {
        count,
        error
    } =
        await supabaseClient
            .from("active_users")
            .select(
                "username",
                {
                    count:
                        "exact",

                    head:
                        true
                }
            );


    if (error) {

        console.error(
            "Online user count error:",
            error
        );


        onlineUsers.textContent =
            "—";


        return;
    }


    onlineUsers.textContent =
        count ?? 0;
}


async function loadTotalMessages() {

    if (!totalMessages) {
        return;
    }


    const {
        count,
        error
    } =
        await supabaseClient
            .from("messages")
            .select(
                "id",
                {
                    count:
                        "exact",

                    head:
                        true
                }
            );


    if (error) {

        console.error(
            "Message count error:",
            error
        );


        totalMessages.textContent =
            "—";


        return;
    }


    totalMessages.textContent =
        count ?? 0;
}


/* ==========================================
   CREATE USER
========================================== */

if (createUserForm) {

    createUserForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const email =
                newUserEmail?.value
                    .trim()
                    .toLowerCase();


            const username =
                newUserUsername?.value
                    .trim();


            const password =
                newUserPassword?.value ||
                "";


            const role =
                newUserRole?.value ||
                "user";


            setCreateUserMessage(
                "",
                ""
            );


            if (!email) {

                setCreateUserMessage(
                    "Email is required.",
                    "error"
                );


                return;
            }


            if (!username) {

                setCreateUserMessage(
                    "Username is required.",
                    "error"
                );


                return;
            }


            if (
                password.length <
                6
            ) {

                setCreateUserMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );


                return;
            }


            if (createUserButton) {

                createUserButton.disabled =
                    true;


                createUserButton.textContent =
                    "Creating User...";
            }


            try {

                const {
                    data:
                        sessionData,
                    error:
                        sessionError
                } =
                    await supabaseClient
                        .auth
                        .getSession();


                if (
                    sessionError ||
                    !sessionData?.session
                ) {

                    throw new Error(
                        "Your admin session has expired. Please sign in again."
                    );
                }


                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .functions
                        .invoke(
                            "create-user",
                            {
                                body: {
                                    email,
                                    username,
                                    password,
                                    role
                                }
                            }
                        );


                if (error) {
                    throw error;
                }


                if (!data?.success) {

                    throw new Error(
                        data?.error ||
                        "Could not create user."
                    );
                }


                setCreateUserMessage(
                    data.message ||
                    "User created successfully.",
                    "success"
                );


                createUserForm.reset();


                await loadUsers();

            } catch (error) {

                console.error(
                    "Create user error:",
                    error
                );


                setCreateUserMessage(
                    getSupabaseErrorMessage(
                        error
                    ),
                    "error"
                );

            } finally {

                if (createUserButton) {

                    createUserButton.disabled =
                        false;


                    createUserButton.textContent =
                        "Create User";
                }
            }
        }
    );
}


function setCreateUserMessage(
    message,
    type
) {

    if (!createUserMessage) {
        return;
    }


    createUserMessage.textContent =
        message;


    createUserMessage.className =
        `form-message ${
            type || ""
        }`;
}


/* ==========================================
   EDIT USER
========================================== */

function openEditModal(
    user
) {

    if (!editUserOverlay) {
        return;
    }


    editingUserId =
        user.id;


    if (editUserId) {

        editUserId.value =
            user.id;
    }


    if (editUsername) {

        editUsername.value =
            user.username ||
            "";
    }


    if (editRole) {

        editRole.value =
            user.role ||
            "user";
    }


    if (editStatus) {

        editStatus.value =
            user.is_active === false
                ? "false"
                : "true";
    }


    setEditUserMessage(
        "",
        ""
    );


    editUserOverlay.classList.remove(
        "hidden"
    );


    editUsername?.focus();
}


function closeEditUserModal() {

    editUserOverlay?.classList.add(
        "hidden"
    );


    editingUserId =
        null;


    editUserForm?.reset();


    setEditUserMessage(
        "",
        ""
    );
}


if (closeEditModal) {

    closeEditModal.addEventListener(
        "click",
        closeEditUserModal
    );
}


if (cancelEditButton) {

    cancelEditButton.addEventListener(
        "click",
        closeEditUserModal
    );
}


if (editUserForm) {

    editUserForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const userId =
                editingUserId ||
                editUserId?.value;


            const username =
                editUsername?.value
                    .trim();


            const role =
                editRole?.value ||
                "user";


            const isActive =
                editStatus?.value ===
                "true";


            if (!userId) {

                setEditUserMessage(
                    "No user selected.",
                    "error"
                );


                return;
            }


            if (!username) {

                setEditUserMessage(
                    "Username is required.",
                    "error"
                );


                return;
            }


            if (
                userId ===
                currentAdmin?.id &&
                !isActive
            ) {

                setEditUserMessage(
                    "You cannot deactivate your own admin account.",
                    "error"
                );


                return;
            }


            try {
                await updateUserProfile(
                    userId,
                    username,
                    role,
                    isActive
                );
            } catch (error) {
                console.error(
                    "Update profile error:",
                    error
                );

                setEditUserMessage(
                    getSupabaseErrorMessage(
                        error
                    ),
                    "error"
                );
            }
        }
    );
}


async function updateUserProfile(
    userId,
    username,
    role,
    isActive
) {

    if (
        userId ===
        currentAdmin?.id &&
        role !==
        "admin"
    ) {

        setEditUserMessage(
            "You cannot remove your own admin role.",
            "error"
        );


        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("profiles")
            .update({
                username,
                role,
                is_active:
                    isActive
            })
            .eq(
                "id",
                userId
            );


    if (error) {

        console.error(
            "Update profile error:",
            error
        );


        setEditUserMessage(
            getSupabaseErrorMessage(
                error
            ),
            "error"
        );


        return;
    }


    if (
        userId ===
        currentAdmin?.id
    ) {

        currentProfile.username =
            username;


        currentProfile.role =
            role;


        currentProfile.is_active =
            isActive;


        updateAdminIdentity();
    }


    setEditUserMessage(
        "User updated successfully.",
        "success"
    );


    setTimeout(
        async () => {

            closeEditUserModal();


            await loadUsers();

        },
        500
    );
}


async function toggleUserStatus(
    user
) {

    if (!user) {
        return;
    }


    if (
        user.id ===
        currentAdmin?.id
    ) {

        alert(
            "You cannot deactivate yourself."
        );


        return;
    }


    const newStatus =
        user.is_active === false;


    const {
        error
    } =
        await supabaseClient
            .from("profiles")
            .update({
                is_active:
                    newStatus
            })
            .eq(
                "id",
                user.id
            );


    if (error) {

        console.error(
            "Status update error:",
            error
        );


        alert(
            getSupabaseErrorMessage(
                error
            )
        );


        return;
    }


    await loadUsers();
}


/* ==========================================
   ACCESS CODE MANAGEMENT
========================================== */

async function loadAccessCodes() {

    if (!accessCodesTableBody) {
        return;
    }


    showAccessCodeTableMessage(
        "Loading access codes..."
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .from("access_codes")
            .select(
                "id, user_id, is_active, expires_at, failed_attempts, locked_until, last_used_at, created_at, updated_at"
            )
            .order(
                "created_at",
                {
                    ascending:
                        false
                }
            );


    if (error) {

        console.error(
            "Load access codes error:",
            error
        );


        showAccessCodeTableMessage(
            "Could not load access codes."
        );


        return;
    }


    accessCodes =
        data || [];


    await loadAccessCodeUsers();


    renderAccessCodes(
        accessCodes
    );
}


async function loadAccessCodeUsers() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, username, role, is_active"
            )
            .order(
                "username",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "Load access-code users error:",
            error
        );


        accessCodeUsers =
            [];


        return;
    }


    accessCodeUsers =
        data || [];


    populateAccessCodeUserSelect();
}


function getAccessCodeUser(
    userId
) {

    return (
        accessCodeUsers.find(
            user =>
                user.id ===
                userId
        ) ||
        null
    );
}


function populateAccessCodeUserSelect() {

    if (!accessCodeUser) {
        return;
    }


    const selected =
        accessCodeUser.value;


    accessCodeUser.innerHTML =
        "";


    const placeholder =
        document.createElement(
            "option"
        );


    placeholder.value =
        "";


    placeholder.textContent =
        "Select user";


    accessCodeUser.appendChild(
        placeholder
    );


    accessCodeUsers.forEach(
        user => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                user.id;


            option.textContent =
                `${user.username || "Unknown"}${
                    user.is_active === false
                        ? " (Inactive)"
                        : ""
                }`;


            accessCodeUser.appendChild(
                option
            );
        }
    );


    if (selected) {

        accessCodeUser.value =
            selected;
    }
}


function renderAccessCodes(
    list
) {

    if (!accessCodesTableBody) {
        return;
    }


    accessCodesTableBody.innerHTML =
        "";


    if (
        !list ||
        list.length === 0
    ) {

        showAccessCodeTableMessage(
            "No access codes found."
        );


        return;
    }


    list.forEach(
        code => {

            const user =
                getAccessCodeUser(
                    code.user_id
                );


            const row =
                document.createElement(
                    "tr"
                );


            const userCell =
                document.createElement(
                    "td"
                );


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "access-code-user";


            const avatar =
                document.createElement(
                    "div"
                );


            avatar.className =
                "user-avatar";


            avatar.textContent =
                getInitials(
                    user?.username ||
                    "U"
                );


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "access-code-meta";


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                user?.username ||
                "Unknown user";


            const sub =
                document.createElement(
                    "span"
                );


            sub.textContent =
                code.failed_attempts > 0
                    ? `${code.failed_attempts} failed attempt${
                        code.failed_attempts === 1
                            ? ""
                            : "s"
                    }`
                    : "No failed attempts";


            meta.appendChild(
                name
            );


            meta.appendChild(
                sub
            );


            wrapper.appendChild(
                avatar
            );


            wrapper.appendChild(
                meta
            );


            userCell.appendChild(
                wrapper
            );


            const statusCell =
                document.createElement(
                    "td"
                );


            const statusBadge =
                document.createElement(
                    "span"
                );


            const expired =
                code.expires_at &&
                new Date(
                    code.expires_at
                ).getTime() <=
                Date.now();


            const locked =
                code.locked_until &&
                new Date(
                    code.locked_until
                ).getTime() >
                Date.now();


            statusBadge.className =
                "status-badge " +
                (
                    expired
                        ? "code-expired"
                        : code.is_active &&
                          !locked
                            ? "code-active"
                            : "code-blocked"
                );


            statusBadge.textContent =
                expired
                    ? "Expired"
                    : code.is_active &&
                      !locked
                        ? "Active"
                        : locked
                            ? "Locked"
                            : "Blocked";


            statusCell.appendChild(
                statusBadge
            );


            const expiresCell =
                document.createElement(
                    "td"
                );


            expiresCell.textContent =
                code.expires_at
                    ? formatDateTime(
                        code.expires_at
                    )
                    : "Never";


            const lastUsedCell =
                document.createElement(
                    "td"
                );


            lastUsedCell.textContent =
                code.last_used_at
                    ? formatDateTime(
                        code.last_used_at
                    )
                    : "Never";


            const failedCell =
                document.createElement(
                    "td"
                );


            failedCell.textContent =
                String(
                    code.failed_attempts ||
                    0
                );


            const actionsCell =
                document.createElement(
                    "td"
                );


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "table-actions";


            const changeButton =
                document.createElement(
                    "button"
                );


            changeButton.type =
                "button";


            changeButton.className =
                "action-button";


            changeButton.textContent =
                "Change";


            changeButton.addEventListener(
                "click",
                () => {

                    openAccessCodeModal(
                        code
                    );
                }
            );


            const toggleButton =
                document.createElement(
                    "button"
                );


            toggleButton.type =
                "button";


            toggleButton.className =
                `action-button ${
                    code.is_active
                        ? "danger"
                        : "success"
                }`;


            toggleButton.textContent =
                code.is_active
                    ? "Block"
                    : "Unblock";


            toggleButton.addEventListener(
                "click",
                () => {

                    toggleAccessCode(
                        code
                    );
                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "action-button danger";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteAccessCode(
                        code
                    );
                }
            );


            actions.appendChild(
                changeButton
            );


            actions.appendChild(
                toggleButton
            );


            actions.appendChild(
                deleteButton
            );


            actionsCell.appendChild(
                actions
            );


            row.appendChild(
                userCell
            );


            row.appendChild(
                statusCell
            );


            row.appendChild(
                expiresCell
            );


            row.appendChild(
                lastUsedCell
            );


            row.appendChild(
                failedCell
            );


            row.appendChild(
                actionsCell
            );


            accessCodesTableBody.appendChild(
                row
            );
        }
    );
}


function showAccessCodeTableMessage(
    message
) {

    if (!accessCodesTableBody) {
        return;
    }


    accessCodesTableBody.innerHTML =
        "";


    const row =
        document.createElement(
            "tr"
        );


    const cell =
        document.createElement(
            "td"
        );


    cell.colSpan =
        6;


    cell.className =
        "table-empty";


    cell.textContent =
        message;


    row.appendChild(
        cell
    );


    accessCodesTableBody.appendChild(
        row
    );
}


/* ==========================================
   ACCESS CODE MODAL
========================================== */

function openAccessCodeModal(
    code = null
) {

    if (!accessCodeOverlay) {
        return;
    }


    editingAccessCodeId =
        code?.id ||
        null;


    if (accessCodeId) {

        accessCodeId.value =
            code?.id ||
            "";
    }


    if (accessCodeModalTitle) {

        accessCodeModalTitle.textContent =
            code
                ? "Change Access Code"
                : "Create Access Code";
    }


    if (accessCodeModalSubtitle) {

        accessCodeModalSubtitle.textContent =
            code
                ? "Replace the existing code for this account."
                : "Assign an access code to a LabChat account.";
    }


    if (saveAccessCodeButton) {

        saveAccessCodeButton.textContent =
            code
                ? "Change Code"
                : "Create Code";
    }


    if (accessCodeUser) {

        accessCodeUser.value =
            code?.user_id ||
            "";


        accessCodeUser.disabled =
            Boolean(code);
    }


    if (accessCodeValue) {

        accessCodeValue.value =
            "";


        accessCodeValue.focus();
    }


    if (accessCodeExpiry) {

        accessCodeExpiry.value =
            getExpiryOption(
                code?.expires_at
            );
    }


    setAccessCodeMessage(
        "",
        ""
    );


    accessCodeOverlay.classList.remove(
        "hidden"
    );
}


function closeAccessCodeModalFn() {

    accessCodeOverlay?.classList.add(
        "hidden"
    );


    editingAccessCodeId =
        null;


    accessCodeForm?.reset();


    if (accessCodeUser) {

        accessCodeUser.disabled =
            false;
    }


    setAccessCodeMessage(
        "",
        ""
    );
}


function setAccessCodeMessage(
    message,
    type
) {

    if (!accessCodeMessage) {
        return;
    }


    accessCodeMessage.textContent =
        message;


    accessCodeMessage.className =
        `form-message ${
            type || ""
        }`;
}


function generateNumericCode() {

    const random =
        new Uint32Array(
            3
        );


    crypto.getRandomValues(
        random
    );


    let result =
        "";


    random.forEach(
        value => {

            result +=
                String(value);
        }
    );


    return result
        .replace(
            /\D/g,
            ""
        )
        .slice(
            0,
            10
        )
        .padEnd(
            8,
            "0"
        );
}


function getExpiryTimestamp(
    option,
    currentTimestamp = null
) {

    if (
        option ===
        "keep"
    ) {

        return currentTimestamp;
    }


    if (
        option ===
        "never"
    ) {

        return null;
    }


    const days = {
        "1d": 1,
        "7d": 7,
        "30d": 30,
        "90d": 90
    }[option];


    if (!days) {
        return null;
    }


    return new Date(
        Date.now() +
        days *
        24 *
        60 *
        60 *
        1000
    ).toISOString();
}


function getExpiryOption(
    timestamp
) {

    if (!timestamp) {

        return "never";
    }


    return "keep";
}


function formatDateTime(
    timestamp
) {

    if (!timestamp) {

        return "—";
    }


    const date =
        new Date(
            timestamp
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";
    }


    return date.toLocaleString(
        [],
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"
        }
    );
}


function showNewAccessCode(
    user,
    rawCode
) {

    if (!newAccessCodeOverlay) {
        return;
    }


    if (newAccessCodeUser) {

        newAccessCodeUser.textContent =
            `User: ${
                user?.username ||
                "Unknown"
            }`;
    }


    if (newAccessCodeValue) {

        newAccessCodeValue.textContent =
            rawCode;
    }


    if (newAccessCodeMessage) {

        newAccessCodeMessage.textContent =
            "";


        newAccessCodeMessage.className =
            "form-message";
    }


    newAccessCodeOverlay.classList.remove(
        "hidden"
    );
}


async function saveAccessCode() {

    const wasEditing =
        Boolean(
            editingAccessCodeId
        );


    const rawCode =
        accessCodeValue?.value
            .trim() ||
        "";


    if (
        !/^\d{8,12}$/.test(
            rawCode
        )
    ) {

        setAccessCodeMessage(
            "Access code must contain 8–12 digits.",
            "error"
        );


        return;
    }


    if (
        !editingAccessCodeId &&
        !accessCodeUser?.value
    ) {

        setAccessCodeMessage(
            "Select a user.",
            "error"
        );


        return;
    }


    if (saveAccessCodeButton) {

        saveAccessCodeButton.disabled =
            true;


        saveAccessCodeButton.textContent =
            editingAccessCodeId
                ? "Changing..."
                : "Creating...";
    }


    try {

        const existingCode =
            accessCodes.find(
                item =>
                    item.id ===
                    editingAccessCodeId
            );


        const expiry =
            getExpiryTimestamp(
                accessCodeExpiry?.value ||
                "never",

                existingCode?.expires_at ||
                null
            );


        if (wasEditing) {

            const {
                error
            } =
                await supabaseClient
                    .rpc(
                        "change_access_code",
                        {
                            p_code_id:
                                editingAccessCodeId,

                            p_new_code:
                                rawCode,

                            p_expires_at:
                                expiry
                        }
                    );


            if (error) {
                throw error;
            }


            const code =
                accessCodes.find(
                    item =>
                        item.id ===
                        editingAccessCodeId
                );


            const user =
                getAccessCodeUser(
                    code?.user_id
                );


            closeAccessCodeModalFn();


            showNewAccessCode(
                user,
                rawCode
            );

        } else {

            const userId =
                accessCodeUser.value;


            const {
                error
            } =
                await supabaseClient
                    .rpc(
                        "create_access_code",
                        {
                            p_user_id:
                                userId,

                            p_code:
                                rawCode,

                            p_expires_at:
                                expiry
                        }
                    );


            if (error) {
                throw error;
            }


            const user =
                getAccessCodeUser(
                    userId
                );


            closeAccessCodeModalFn();


            showNewAccessCode(
                user,
                rawCode
            );
        }


        await loadAccessCodes();

    } catch (error) {

        console.error(
            "Save access code error:",
            error
        );


        setAccessCodeMessage(
            getSupabaseErrorMessage(
                error
            ),
            "error"
        );

    } finally {

        if (saveAccessCodeButton) {

            saveAccessCodeButton.disabled =
                false;


            saveAccessCodeButton.textContent =
                wasEditing
                    ? "Change Code"
                    : "Create Code";
        }
    }
}


async function toggleAccessCode(
    code
) {

    if (!code?.id) {
        return;
    }


    const action =
        code.is_active
            ? "block"
            : "unblock";


    if (
        !window.confirm(
            `Are you sure you want to ${action} this access code?`
        )
    ) {

        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient
                .rpc(
                    "set_access_code_status",
                    {
                        p_code_id:
                            code.id,

                        p_is_active:
                            !code.is_active
                    }
                );


        if (error) {
            throw error;
        }


        await loadAccessCodes();

    } catch (error) {

        console.error(
            "Toggle access code error:",
            error
        );


        window.alert(
            getSupabaseErrorMessage(
                error
            )
        );
    }
}


async function deleteAccessCode(
    code
) {

    if (!code?.id) {
        return;
    }


    const user =
        getAccessCodeUser(
            code.user_id
        );


    if (
        !window.confirm(
            `Delete the access code assigned to ${
                user?.username ||
                "this user"
            }?`
        )
    ) {

        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "access_codes"
                )
                .delete()
                .eq(
                    "id",
                    code.id
                );


        if (error) {
            throw error;
        }


        await loadAccessCodes();

    } catch (error) {

        console.error(
            "Delete access code error:",
            error
        );


        window.alert(
            getSupabaseErrorMessage(
                error
            )
        );
    }
}


/* ==========================================
   ACCESS CODE EVENTS
========================================== */

if (createAccessCodeButton) {

    createAccessCodeButton.addEventListener(
        "click",
        () => {

            openAccessCodeModal();
        }
    );
}


if (refreshAccessCodesButton) {

    refreshAccessCodesButton.addEventListener(
        "click",
        () => {

            loadAccessCodes();
        }
    );
}


if (generateAccessCodeButton) {

    generateAccessCodeButton.addEventListener(
        "click",
        () => {

            if (accessCodeValue) {

                accessCodeValue.value =
                    generateNumericCode();


                accessCodeValue.focus();
            }
        }
    );
}


if (accessCodeForm) {

    accessCodeForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            void saveAccessCode();
        }
    );
}


if (closeAccessCodeModal) {

    closeAccessCodeModal.addEventListener(
        "click",
        closeAccessCodeModalFn
    );
}


if (cancelAccessCodeButton) {

    cancelAccessCodeButton.addEventListener(
        "click",
        closeAccessCodeModalFn
    );
}


if (closeNewAccessCodeModal) {

    closeNewAccessCodeModal.addEventListener(
        "click",
        () => {

            newAccessCodeOverlay?.classList.add(
                "hidden"
            );
        }
    );
}


if (newAccessCodeOverlay) {

    newAccessCodeOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                newAccessCodeOverlay
            ) {

                newAccessCodeOverlay.classList.add(
                    "hidden"
                );
            }
        }
    );
}


if (copyNewAccessCodeButton) {

    copyNewAccessCodeButton.addEventListener(
        "click",
        async () => {

            const value =
                newAccessCodeValue?.textContent ||
                "";


            if (!value) {
                return;
            }


            try {

                await navigator.clipboard.writeText(
                    value
                );


                if (newAccessCodeMessage) {

                    newAccessCodeMessage.textContent =
                        "Copied.";


                    newAccessCodeMessage.className =
                        "form-message success";
                }

            } catch (error) {

                console.error(
                    "Copy access code error:",
                    error
                );


                if (newAccessCodeMessage) {

                    newAccessCodeMessage.textContent =
                        "Copy failed. Select the code manually.";


                    newAccessCodeMessage.className =
                        "form-message error";
                }
            }
        }
    );
}


if (accessCodeSearch) {

    accessCodeSearch.addEventListener(
        "input",
        () => {

            const query =
                accessCodeSearch.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                renderAccessCodes(
                    accessCodes
                );


                return;
            }


            const filtered =
                accessCodes.filter(
                    code => {

                        const user =
                            getAccessCodeUser(
                                code.user_id
                            );


                        return String(
                            user?.username ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            );
                    }
                );


            renderAccessCodes(
                filtered
            );
        }
    );
}


if (accessCodeOverlay) {

    accessCodeOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                accessCodeOverlay
            ) {

                closeAccessCodeModalFn();
            }
        }
    );
}


/* ==========================================
   PDF MANAGEMENT
========================================== */

async function loadPDFDocuments() {

    if (!pdfTableBody) {
        return;
    }


    showPDFTableMessage(
        "Loading PDFs..."
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .from("pdf_documents")
            .select(
                "id, title, file_name, github_path, github_url, is_active, uploaded_by, created_at, updated_at"
            )
            .order(
                "created_at",
                {
                    ascending:
                        false
                }
            );


    if (error) {

        console.error(
            "Load PDF documents error:",
            error
        );


        showPDFTableMessage(
            "Could not load PDFs."
        );


        return;
    }


    pdfDocuments =
        data || [];


    renderPDFDocuments(
        pdfDocuments
    );
}


/* ==========================================
   RENDER PDF DOCUMENTS
========================================== */

function renderPDFDocuments(
    list
) {

    if (!pdfTableBody) {
        return;
    }


    pdfTableBody.innerHTML =
        "";


    if (
        !list ||
        list.length === 0
    ) {

        showPDFTableMessage(
            "No PDFs have been registered yet."
        );


        return;
    }


    list.forEach(
        pdf => {

            const row =
                document.createElement(
                    "tr"
                );


            /* ==================================
               PDF NAME
            ================================== */

            const titleCell =
                document.createElement(
                    "td"
                );


            const pdfIdentity =
                document.createElement(
                    "div"
                );


            pdfIdentity.className =
                "pdf-identity";


            const pdfIcon =
                document.createElement(
                    "div"
                );


            pdfIcon.className =
                "pdf-icon";


            pdfIcon.textContent =
                "PDF";


            const pdfInfo =
                document.createElement(
                    "div"
                );


            pdfInfo.className =
                "pdf-info";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                pdf.title ||
                pdf.file_name ||
                "Untitled PDF";


            const filename =
                document.createElement(
                    "span"
                );


            filename.textContent =
                pdf.file_name ||
                "No filename";


            pdfInfo.appendChild(
                title
            );


            pdfInfo.appendChild(
                filename
            );


            pdfIdentity.appendChild(
                pdfIcon
            );


            pdfIdentity.appendChild(
                pdfInfo
            );


            titleCell.appendChild(
                pdfIdentity
            );


            /* ==================================
               FILE
            ================================== */

            const fileCell =
                document.createElement(
                    "td"
                );


            fileCell.textContent =
                pdf.github_path ||
                "—";


            /* ==================================
               STATUS
            ================================== */

            const statusCell =
                document.createElement(
                    "td"
                );


            const statusBadge =
                document.createElement(
                    "span"
                );


            statusBadge.className =
                `status-badge ${
                    pdf.is_active
                        ? "status-active"
                        : "status-inactive"
                }`;


            statusBadge.textContent =
                pdf.is_active
                    ? "Active"
                    : "Inactive";


            statusCell.appendChild(
                statusBadge
            );


            /* ==================================
               UPDATED
            ================================== */

            const updatedCell =
                document.createElement(
                    "td"
                );


            updatedCell.textContent =
                formatDateTime(
                    pdf.updated_at ||
                    pdf.created_at
                );


            /* ==================================
               ACTIONS
            ================================== */

            const actionsCell =
                document.createElement(
                    "td"
                );


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "table-actions";


            /* ==================================
               EDIT
            ================================== */

            const editButton =
                document.createElement(
                    "button"
                );


            editButton.type =
                "button";


            editButton.className =
                "action-button";


            editButton.textContent =
                "Edit";


            editButton.addEventListener(
                "click",
                () => {

                    openPDFModal(
                        pdf
                    );
                }
            );


            /* ==================================
               ACTIVE
            ================================== */

            const activeButton =
                document.createElement(
                    "button"
                );


            activeButton.type =
                "button";


            activeButton.className =
                `action-button ${
                    pdf.is_active
                        ? "success"
                        : ""
                }`;


            activeButton.textContent =
                pdf.is_active
                    ? "Active"
                    : "Set Active";


            activeButton.disabled =
                Boolean(
                    pdf.is_active
                );


            if (
                !pdf.is_active
            ) {

                activeButton.addEventListener(
                    "click",
                    () => {

                        setActivePDF(
                            pdf
                        );
                    }
                );
            }


            /* ==================================
               DELETE
            ================================== */

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "action-button danger";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                () => {

                    deletePDF(
                        pdf
                    );
                }
            );


            actions.appendChild(
                editButton
            );


            actions.appendChild(
                activeButton
            );


            actions.appendChild(
                deleteButton
            );


            actionsCell.appendChild(
                actions
            );


            row.appendChild(
                titleCell
            );


            row.appendChild(
                fileCell
            );


            row.appendChild(
                statusCell
            );


            row.appendChild(
                updatedCell
            );


            row.appendChild(
                actionsCell
            );


            pdfTableBody.appendChild(
                row
            );
        }
    );
}


/* ==========================================
   PDF TABLE MESSAGE
========================================== */

function showPDFTableMessage(
    message
) {

    if (!pdfTableBody) {
        return;
    }


    pdfTableBody.innerHTML =
        "";


    const row =
        document.createElement(
            "tr"
        );


    const cell =
        document.createElement(
            "td"
        );


    cell.colSpan =
        5;


    cell.className =
        "table-empty";


    cell.textContent =
        message;


    row.appendChild(
        cell
    );


    pdfTableBody.appendChild(
        row
    );
}


/* ==========================================
   PDF SEARCH
========================================== */

if (pdfSearch) {

    pdfSearch.addEventListener(
        "input",
        () => {

            const query =
                pdfSearch.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                renderPDFDocuments(
                    pdfDocuments
                );


                return;
            }


            const filtered =
                pdfDocuments.filter(
                    pdf => {

                        return (
                            String(
                                pdf.title ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            String(
                                pdf.file_name ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            String(
                                pdf.github_path ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            String(
                                pdf.github_url ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                   query
                                )
                        );
                    }
                );


            renderPDFDocuments(
                filtered
            );
        }
    );
}


/* ==========================================
   PDF REFRESH
========================================== */

if (refreshPDFButton) {

    refreshPDFButton.addEventListener(
        "click",
        () => {

            loadPDFDocuments();
        }
    );
}


/* ==========================================
   OPEN PDF MODAL
========================================== */

function openPDFModal(
    pdf = null
) {

    if (!pdfOverlay) {
        return;
    }


    editingPDFId =
        pdf?.id ||
        null;


    if (pdfId) {

        pdfId.value =
            pdf?.id ||
            "";
    }


    if (pdfModalTitle) {

        pdfModalTitle.textContent =
            pdf
                ? "Edit PDF"
                : "Add PDF";
    }


    if (pdfModalSubtitle) {

        pdfModalSubtitle.textContent =
            pdf
                ? "Update the PDF information stored in LabChat."
                : "Register a PDF that has already been uploaded to GitHub.";
    }


    if (pdfTitle) {

        pdfTitle.value =
            pdf?.title ||
            "";
    }


    if (pdfFileName) {

        pdfFileName.value =
            pdf?.file_name ||
            "";
    }


    if (pdfGithubPath) {

        pdfGithubPath.value =
            pdf?.github_path ||
            "";
    }


    if (pdfGithubUrl) {

        pdfGithubUrl.value =
            pdf?.github_url ||
            "";
    }


    if (pdfSetActive) {

        const isActivePDF =
            Boolean(
                pdf?.is_active
            );

        /*
         * An active PDF must remain active while it is being edited.
         * The server-side RPC remains the authority for switching the
         * active document; this only keeps the modal state truthful.
         */
        pdfSetActive.checked =
            isActivePDF;

        pdfSetActive.disabled =
            isActivePDF;
    }


    setPDFMessage(
        "",
        ""
    );


    pdfOverlay.classList.remove(
        "hidden"
    );


    pdfTitle?.focus();
}


/* ==========================================
   CLOSE PDF MODAL
========================================== */

function closePDFModalFn() {
    pdfOverlay?.classList.add(
        "hidden"
    );

    editingPDFId = null;

    pdfForm?.reset();

    if (pdfSetActive) {

        /*
         * reset() restores HTML defaults, which could be checked. Set the
         * new-PDF state explicitly so the next modal always starts usable.
         */
        pdfSetActive.checked =
            false;

        pdfSetActive.disabled =
            false;
    }

    setPDFMessage("", "");
}


/* ==========================================
   PDF MESSAGE
========================================== */

function setPDFMessage(
    message,
    type
) {

    if (!pdfMessage) {
        return;
    }


    pdfMessage.textContent =
        message;


    pdfMessage.className =
        `form-message ${
            type || ""
        }`;
}


/* ==========================================
   SAVE PDF
========================================== */

async function savePDF() {
    const wasEditing =
        Boolean(
            editingPDFId
        );

    const title =
        pdfTitle?.value
            .trim() ||
        "";

    const fileName =
        pdfFileName?.value
            .trim() ||
        "";

    const githubPath =
        pdfGithubPath?.value
            .trim() ||
        "";

    const githubUrl =
        pdfGithubUrl?.value
            .trim() ||
        "";

    const shouldBeActive =
        Boolean(
            pdfSetActive?.checked
        );

    /*
     * Remember whether this PDF was already active
     * before editing.
     */
    const wasActiveBeforeEdit =
        Boolean(
            editingPDFId &&
            pdfDocuments?.find(
                pdf =>
                    pdf.id ===
                    editingPDFId
            )?.is_active
        );

    if (!title) {
        setPDFMessage(
            "PDF title is required.",
            "error"
        );

        return;
    }

    if (!fileName) {
        setPDFMessage(
            "PDF filename is required.",
            "error"
        );

        return;
    }

    if (
        !fileName
            .toLowerCase()
            .endsWith(
                ".pdf"
            )
    ) {
        setPDFMessage(
            "Filename must end with .pdf.",
            "error"
        );

        return;
    }

    if (!githubPath) {
        setPDFMessage(
            "GitHub path is required.",
            "error"
        );

        return;
    }

    if (!githubUrl) {
        setPDFMessage(
            "GitHub URL is required.",
            "error"
        );

        return;
    }

    try {
        const parsedURL =
            new URL(
                githubUrl
            );

        if (
            parsedURL.protocol !==
                "https:" ||
            (
                parsedURL.hostname !==
                    "github.com" &&
                parsedURL.hostname !==
                    "raw.githubusercontent.com"
            )
        ) {
            setPDFMessage(
                "Enter a valid GitHub PDF URL.",
                "error"
            );

            return;
        }

    } catch {
        setPDFMessage(
            "Enter a valid GitHub PDF URL.",
            "error"
        );

        return;
    }

    /*
     * Prevent unsafe GitHub repository paths.
     */
    if (
        githubPath.startsWith("/") ||
        githubPath.includes("..") ||
        githubPath.includes("\\")
    ) {
        setPDFMessage(
            "Enter a valid GitHub repository path.",
            "error"
        );

        return;
    }

    if (savePDFButton) {
        savePDFButton.disabled =
            true;

        savePDFButton.textContent =
            wasEditing
                ? "Saving..."
                : "Adding...";
    }

    try {
        let savedPDF =
            null;

        /* ==================================
           UPDATE EXISTING PDF
        ================================== */

        if (wasEditing) {
            const {
                data,
                error
            } =
                await supabaseClient
                    .from(
                        "pdf_documents"
                    )
                    .update({
                        title,
                        file_name:
                            fileName,
                        github_path:
                            githubPath,
                        github_url:
                            githubUrl,
                        updated_at:
                            new Date().toISOString()
                    })
                    .eq(
                        "id",
                        editingPDFId
                    )
                    .select(
                        "id, title, file_name, github_path, github_url, is_active, uploaded_by, created_at, updated_at"
                    )
                    .single();

            if (error) {
                throw error;
            }

            savedPDF =
                data;
        }

        /* ==================================
           INSERT NEW PDF
        ================================== */

        else {
            const {
                data,
                error
            } =
                await supabaseClient
                    .from(
                        "pdf_documents"
                    )
                    .insert({
                        title,
                        file_name:
                            fileName,
                        github_path:
                            githubPath,
                        github_url:
                            githubUrl,
                        is_active:
                            false,
                        uploaded_by:
                            currentAdmin?.id
                    })
                    .select(
                        "id, title, file_name, github_path, github_url, is_active, uploaded_by, created_at, updated_at"
                    )
                    .single();

            if (error) {
                throw error;
            }

            savedPDF =
                data;
        }

        /* ==================================
           SET ACTIVE PDF
        ================================== */

        /*
         * Activate when:
         *
         * 1. User checked "Set Active"
         * OR
         * 2. The PDF was already active before editing.
         *
         * This prevents an existing active PDF
         * from accidentally losing its active state.
         */
        if (
            savedPDF?.id &&
            (
                shouldBeActive ||
                wasActiveBeforeEdit
            )
        ) {
            const {
                error
            } =
                await supabaseClient
                    .rpc(
                        "set_active_pdf",
                        {
                            p_pdf_id:
                                savedPDF.id
                        }
                    );

            if (error) {
                throw error;
            }
        }

        closePDFModalFn();

        await loadPDFDocuments();

    } catch (error) {
        console.error(
            "Save PDF error:",
            error
        );

        setPDFMessage(
            getSupabaseErrorMessage(
                error
            ),
            "error"
        );

    } finally {
        if (savePDFButton) {
            savePDFButton.disabled =
                false;

            savePDFButton.textContent =
                wasEditing
                    ? "Save Changes"
                    : "Add PDF";
        }
    }
}


/* ==========================================
   SET ACTIVE PDF
========================================== */

async function setActivePDF(
    pdf
) {

    if (!pdf?.id) {
        return;
    }


    if (pdf.is_active) {
        return;
    }


    const confirmed =
        window.confirm(
            `Set "${pdf.title || pdf.file_name}" as the active LabChat PDF?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient
                .rpc(
                    "set_active_pdf",
                    {
                        p_pdf_id:
                            pdf.id
                    }
                );


        if (error) {
            throw error;
        }


        await loadPDFDocuments();


        window.alert(
            `"${pdf.title || pdf.file_name}" is now the active PDF.`
        );

    } catch (error) {

        console.error(
            "Set active PDF error:",
            error
        );


        window.alert(
            getSupabaseErrorMessage(
                error
            )
        );
    }
}


/* ==========================================
   DELETE PDF
========================================== */

async function deletePDF(
    pdf
) {

    if (!pdf?.id) {
        return;
    }


    if (pdf.is_active) {

        window.alert(
            "This PDF is currently active. Set another PDF as active before deleting it."
        );


        return;
    }


    const confirmed =
        window.confirm(
            `Delete "${pdf.title || pdf.file_name}" from the LabChat PDF registry?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "pdf_documents"
                )
                .delete()
                .eq(
                    "id",
                    pdf.id
                );


        if (error) {
            throw error;
        }


        await loadPDFDocuments();

    } catch (error) {

        console.error(
            "Delete PDF error:",
            error
        );


        window.alert(
            getSupabaseErrorMessage(
                error
            )
        );
    }
}


/* ==========================================
   PDF EVENTS
========================================== */

if (addPDFButton) {

    addPDFButton.addEventListener(
        "click",
        () => {

            openPDFModal();
        }
    );
}


if (pdfForm) {

    pdfForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            void savePDF();
        }
    );
}


if (closePDFModal) {

    closePDFModal.addEventListener(
        "click",
        closePDFModalFn
    );
}


if (cancelPDFButton) {

    cancelPDFButton.addEventListener(
        "click",
        closePDFModalFn
    );
}


if (pdfOverlay) {

    pdfOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                pdfOverlay
            ) {

                closePDFModalFn();
            }
        }
    );
}


/* ==========================================
   LOGOUT
========================================== */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );
}


async function logout() {

    try {

        await supabaseClient
            .auth
            .signOut();

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    } finally {

        redirectToLogin();
    }
}


/* ==========================================
   REDIRECT
========================================== */

function redirectToLogin() {

    window.location.href =
        "index.html";
}


/* ==========================================
   TABLE LOADING
========================================== */

function showLoading() {

    if (!usersTableBody) {
        return;
    }


    usersTableBody.innerHTML =
        "";


    const row =
        document.createElement(
            "tr"
        );


    const cell =
        document.createElement(
            "td"
        );


    cell.colSpan =
        5;


    cell.className =
        "table-empty";


    cell.textContent =
        "Loading users...";


    row.appendChild(
        cell
    );


    usersTableBody.appendChild(
        row
    );
}


function showTableMessage(
    message
) {

    if (!usersTableBody) {
        return;
    }


    usersTableBody.innerHTML =
        "";


    const row =
        document.createElement(
            "tr"
        );


    const cell =
        document.createElement(
            "td"
        );


    cell.colSpan =
        5;


    cell.className =
        "table-empty";


    cell.textContent =
        message;


    row.appendChild(
        cell
    );


    usersTableBody.appendChild(
        row
    );
}


/* ==========================================
   EDIT MESSAGE
========================================== */

function setEditUserMessage(
    message,
    type
) {

    if (!editUserMessage) {
        return;
    }


    editUserMessage.textContent =
        message;


    editUserMessage.className =
        `form-message ${
            type || ""
        }`;
}


/* ==========================================
   SUPABASE ERROR
========================================== */

function getSupabaseErrorMessage(
    error
) {

    return (
        error?.message ||
        error?.details ||
        error?.hint ||
        "The request could not be completed."
    );
}


/* ==========================================
   HELPERS
========================================== */

function getInitials(
    value
) {

    const text =
        String(
            value ||
            "U"
        )
            .trim();


    if (!text) {
        return "U";
    }


    const parts =
        text.split(
            /\s+/
        );


    if (
        parts.length ===
        1
    ) {

        return parts[0]
            .substring(
                0,
                2
            )
            .toUpperCase();
    }


    return (
        parts[0][0] +
        parts[1][0]
    ).toUpperCase();
}


function formatDate(
    timestamp
) {

    if (!timestamp) {
        return "—";
    }


    const date =
        new Date(
            timestamp
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";
    }


    return date.toLocaleDateString(
        [],
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"
        }
    );
}


/* ==========================================
   GLOBAL ESCAPE HANDLING
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;
        }


        if (
            newAccessCodeOverlay &&
            !newAccessCodeOverlay.classList.contains(
                "hidden"
            )
        ) {

            newAccessCodeOverlay.classList.add(
                "hidden"
            );


            return;
        }


        if (
            accessCodeOverlay &&
            !accessCodeOverlay.classList.contains(
                "hidden"
            )
        ) {

            closeAccessCodeModalFn();


            return;
        }


        if (
            pdfOverlay &&
            !pdfOverlay.classList.contains(
                "hidden"
            )
        ) {

            closePDFModalFn();


            return;
        }


        if (
            editUserOverlay &&
            !editUserOverlay.classList.contains(
                "hidden"
            )
        ) {

            closeEditUserModal();
        }
    }
);


/* ==========================================
   CLICK OUTSIDE EDIT USER MODAL
========================================== */

if (editUserOverlay) {

    editUserOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                editUserOverlay
            ) {

                closeEditUserModal();
            }
        }
    );
}
