import {pinyin} from "pinyin-pro";
export const toSlug = (value: string): string => {
    if (!value) return '';
    const hasChinese = /[\u4e00-\u9fa5]/.test(value);
    const raw = hasChinese
        ? pinyin(value, { toneType: 'none', type: 'array', nonZh: 'reserved', v: true }).join('-')
        : value;
    return raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};
