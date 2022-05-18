export interface ICampsiteLog {
    message: string;
    type?: 'info' | 'warning' | 'error';
    args?: any;
}