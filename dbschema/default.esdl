module default {
 type User {
        required property UserID -> uuid {
            default := sys::uuid_generate_v1mc();
        }
        required property Email -> str;
        required property CreatedAt -> datetime {
            default := datetime_current();
        }
        multi link Photos -> Photo;
    }
    type Photo {
        required property PhotoID -> uuid {
            default := sys::uuid_generate_v1mc();
        }
        required property PhotoURL -> str;
        required property UploadDate -> cal::local_date;
        required property IsFinalized -> bool {
            default := false;
        }
        link User -> User;
    }
}
