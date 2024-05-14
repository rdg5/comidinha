module default {
  type User {
    required property UserID -> uuid {
      default := std::uuid_generate_v4();
    }
    required property Email -> str;
    required property CreatedAt -> datetime {
      default := datetime_current();
    }
    multi link Photos -> Photo;
  }
  
  type Photo {
    required property PhotoID -> uuid {
      default := std::uuid_generate_v4();
    }
    required property PhotoURL -> str;
    required property UploadDate -> cal::local_date;
    required property IsFinalized -> bool {
      default := false;
    }
    link User -> User;
  }
}


