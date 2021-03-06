const STATUS = {
    /**
     * 待提交
     */
    WAITCOMMIT: 'WaitCommit',
    WAITCOMMIT_LABEL: '待提交',
    /**
     * 待审核
     */
    WAITAUDIT: 'WaitAudit',
    WAITAUDIT_LABEL: '待审核',
    /**
     * 已审核
     */
    AUDITED: 'Audited',
    AUDITED_LABEL: '已审核',
    /**
     * 已发布
     */
    PUBLISHED: 'Published',
    PUBLISHED_LABEL: '已上架',
    /**
     * 已下架
     */
    OFFLINE: 'Offline',
    OFFLINE_LABEL: '已下架',
    /**
     * 已回收
     */
    RECYCLED: 'Recycled',
    RECYCLED_LABEL: '已回收'
}

const STATUS_OPTION = [
    { label: STATUS.WAITCOMMIT_LABEL, value: STATUS.WAITCOMMIT },
    { label: STATUS.WAITAUDIT_LABEL, value: STATUS.WAITAUDIT },
    { label: STATUS.AUDITED_LABEL, value: STATUS.AUDITED },
    { label: STATUS.PUBLISHED_LABEL, value: STATUS.PUBLISHED },
    { label: STATUS.OFFLINE_LABEL, value: STATUS.OFFLINE },
    { label: STATUS.RECYCLED_LABEL, value: STATUS.RECYCLED }
]

export const PARENT_NAME = {
    '1': { name: '活动编辑', path: 'index' },
    '2': { name: '活动审核', path: 'activityaudit' },
    '3': { name: '活动发布', path: 'activitypublish' },
    '4': { name: '回收站', path: 'activityrecycle' }
};

export const RESERVETYPE = { none: '直接前往', free: '自由入座', online: '在线选座' };

export function reservetypeOpts() {
    const keys = Object.keys(RESERVETYPE);
    let opts = [];
    for (const key of keys) {
        opts.push({ label: RESERVETYPE[key], value: key });
    }
    return opts;
}

export const ORDER_STATUS = { reserved: '已预定', drawn: '已出票', canceled: '已退订' };
export function orderStatusOpts() {
    const keys = Object.keys(ORDER_STATUS);
    let opts = [];
    for (const key of keys) {
        opts.push({ label: ORDER_STATUS[key], value: key });
    }
    return opts;
}

const statusName = function getStatusName(key) {
    switch (key) {
        case STATUS.WAITCOMMIT:
            return STATUS.WAITCOMMIT_LABEL;
        case STATUS.WAITAUDIT:
            return STATUS.WAITAUDIT_LABEL;
        case STATUS.AUDITED:
            return STATUS.AUDITED_LABEL;
        case STATUS.PUBLISHED:
            return STATUS.PUBLISHED_LABEL;
        case STATUS.OFFLINE:
            return STATUS.OFFLINE_LABEL;
        case STATUS.RECYCLED:
            return STATUS.RECYCLED_LABEL;
    }
}

/**
 * 是否有回收权
 * @param {String} key 状态值
 */
const hasRecycledPermission = function(key) {
    let hasPermission = [STATUS.WAITAUDIT, STATUS.AUDITED, STATUS.OFFLINE];
    return hasPermission.some(item => item === key);
    // return key === STATUS.RECYCLED;
}

/**
 * 是否有提交审核权
 * @param {String} key 状态值
 */
const hasCommitAuditPermission = function(key) {
    return key === STATUS.WAITCOMMIT;
}

const hasDelPermission = function(key) {
    let hasPermission = [STATUS.WAITCOMMIT, STATUS.RECYCLED];
    return hasPermission.some(item => item === key)
}

/**
 * 是否有编辑权
 * @param {String} key 状态值
 */
const hasEditPermission = function(key) {
    let hasPermission = [STATUS.WAITCOMMIT, STATUS.WAITAUDIT, STATUS.AUDITED, STATUS.OFFLINE];
    return hasPermission.some(item => item === key)
}
/**
 * 是否有发布权
 * @param {String} key 状态值
 */
const hasPublishPermission = function(key) {
    let hasPermission = [STATUS.AUDITED, STATUS.OFFLINE];
    return hasPermission.some(item => item === key)
}
/**
 * 是否有下架权
 * @param {String} key 状态值
 */
const hasOfflinePermission = function(key) {
    return key === STATUS.PUBLISHED;
    // let hasPermission = [STATUS.PUBLISHED];
    // return hasPermission.some(item => item === key)
}

export default {
    STATUS,
    STATUS_OPTION,
    statusName,
    hasRecycledPermission,
    hasCommitAuditPermission,
    hasEditPermission,
    hasPublishPermission,
    hasOfflinePermission,
    hasDelPermission,
    PARENT_NAME,
    RESERVETYPE
}
