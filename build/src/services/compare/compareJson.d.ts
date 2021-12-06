declare const testJSON: ({
    experiement: {
        gallery: {
            locale: any;
            scope: string;
            data: {
                file_code: string;
                file_hash: string;
                file_mime: string;
                file_path: string;
                file_size: number;
                description: string;
                file_extension: string;
            }[];
        }[];
    };
    new?: undefined;
} | {
    new: {
        gallery: {
            locale: any;
            scope: any;
            data: {
                description: string;
                file_code: string;
                file_hash: string;
                file_mime: string;
                file_path: string;
                file_size: number;
                file_extension: string;
                image_type: string;
            }[];
        }[];
    };
    experiement?: undefined;
})[];
