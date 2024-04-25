import { SortOrder } from 'src/utils/response.constant';
export declare class QueryParams {
    user_id?: string;
    username?: string;
    author_id?: number;
    order_by?: string;
    page?: number;
    per_page?: number;
    keyword?: string;
    sort?: SortOrder;
    is_all_data?: boolean;
    constructor(keyword?: string, page?: number, sort?: SortOrder, order_by?: string);
}
