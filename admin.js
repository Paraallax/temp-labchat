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


/* ==========================================
   DOM
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
   CREATE USER
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
   EDIT USER
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

document.addEventListener(
    "DOMContentLoaded",
    initializeAdmin
);


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


function showSection(section) {

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
   LOAD USERS
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
                    ascending: false
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


/* ==========================================
   RENDER USERS
   ========================================== */

function renderUsers(list) {

    if (!usersTableBody) {
        return;
    }

    usersTableBody.innerHTML = "";

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

            const userWrapper =
                document.createElement(
                    "div"
                );

            userWrapper.className =
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

            userWrapper.appendChild(
                avatar
            );

            userWrapper.appendChild(
                identity
            );

            userCell.appendChild(
                userWrapper
            );


            /* ROLE */

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


            /* STATUS */

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


            /* CREATED */

            const createdCell =
                document.createElement(
                    "td"
                );

            createdCell.textContent =
                formatDate(
                    user.created_at
                );


            /* ACTIONS */

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

                    toggleUserStatus(
                        user
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
   SEARCH USERS
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
        async () => {

            await loadUsers();
        }
    );
}


/* ==========================================
   DASHBOARD STATS
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

    loadOnlineUserCount();

    if (totalMessages) {

        totalMessages.textContent =
            "—";
    }
}


/* ==========================================
   ONLINE USERS
   ========================================== */

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
                    count: "exact",
                    head: true
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

            if (!password) {

                setCreateUserMessage(
                    "Password is required.",
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
                    data: sessionData,
                    error: sessionError
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
                                    email:
                                        email,

                                    username:
                                        username,

                                    password:
                                        password,

                                    role:
                                        role
                                }
                            }
                        );


                if (error) {

                    console.error(
                        "Create user function error:",
                        error
                    );

                    throw new Error(
                        error.message ||
                        "Could not contact the create-user function."
                    );
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
                    error instanceof Error
                        ? error.message
                        : "Could not create user.",
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
   EDIT USER MODAL
   ========================================== */

function openEditModal(user) {

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

    if (editUserMessage) {

        editUserMessage.textContent =
            "";

        editUserMessage.className =
            "form-message";
    }

    editUserOverlay.classList.remove(
        "hidden"
    );

    if (editUsername) {

        setTimeout(
            () => {

                editUsername.focus();

            },
            50
        );
    }
}


/* ==========================================
   CLOSE EDIT MODAL
   ========================================== */

function closeEditUserModal() {

    if (!editUserOverlay) {
        return;
    }

    editUserOverlay.classList.add(
        "hidden"
    );

    editingUserId =
        null;

    if (editUserForm) {

        editUserForm.reset();
    }

    if (editUserMessage) {

        editUserMessage.textContent =
            "";

        editUserMessage.className =
            "form-message";
    }
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


/* ==========================================
   EDIT USER FORM
   ========================================== */

if (editUserForm) {

    editUserForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const userId =
                editingUserId ||
                editUserId?.value;

            if (!userId) {

                setEditUserMessage(
                    "No user selected.",
                    "error"
                );

                return;
            }

            const username =
                editUsername?.value
                    .trim();

            const role =
                editRole?.value ||
                "user";

            const isActive =
                editStatus?.value ===
                "true";


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


            await updateUserProfile(
                userId,
                username,
                role,
                isActive
            );
        }
    );
}


/* ==========================================
   UPDATE USER PROFILE
   ========================================== */

async function updateUserProfile(
    userId,
    username,
    role,
    isActive
) {

    if (!userId) {
        return;
    }

    if (
        userId ===
        currentAdmin?.id &&
        role !== "admin"
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
                username:
                    username,

                role:
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
            "Could not update user. Check your admin database policies.",
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


/* ==========================================
   ACTIVATE / DEACTIVATE USER
   ========================================== */

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
            "Could not change user status."
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
                    ascending: false
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
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Load access-code users error:",
            error
        );

        accessCodeUsers = [];

        return;
    }


    accessCodeUsers =
        data || [];

    populateAccessCodeUserSelect();
}


function getAccessCodeUser(
    userId
) {

    return accessCodeUsers.find(
        user =>
            user.id === userId
    ) || null;
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


            /* USER */

            const userCell =
                document.createElement(
                    "td"
                );

            const userWrapper =
                document.createElement(
                    "div"
                );

            userWrapper.className =
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

            userWrapper.appendChild(
                avatar
            );

            userWrapper.appendChild(
                meta
            );

            userCell.appendChild(
                userWrapper
            );


            /* STATUS */

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


            /* EXPIRATION */

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


            /* LAST USED */

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


            /* FAILED */

            const failedCell =
                document.createElement(
                    "td"
                );

            failedCell.textContent =
                String(
                    code.failed_attempts ||
                    0
                );


            /* ACTIONS */

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


/* ==========================================
   ACCESS CODE GENERATION
   ========================================== */

function generateNumericCode() {

    let result =
        "";

    const random =
        new Uint32Array(
            3
        );

    crypto.getRandomValues(
        random
    );


    for (
        let i = 0;
        i < random.length;
        i++
    ) {

        result +=
            String(
                random[i]
            );
    }


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


/* ==========================================
   ACCESS CODE EXPIRY
   ========================================== */

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


/* ==========================================
   SHOW NEW CODE
   ========================================== */

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


/* ==========================================
   SAVE ACCESS CODE
   ========================================== */

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


/* ==========================================
   BLOCK / UNBLOCK ACCESS CODE
   ========================================== */

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


/* ==========================================
   DELETE ACCESS CODE
   ========================================== */

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
   LOADING TABLE
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


/* ==========================================
   TABLE MESSAGE
   ========================================== */

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
   ESC KEY
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


        closeEditUserModal();
    }
);


/* ==========================================
   CLICK OUTSIDE EDIT MODAL
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