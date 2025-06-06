import multer, { diskStorage } from "multer";
import { extname } from "path";

// Storage config
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter - accept only JSON files
const fileFilter = (req, file, cb) => {
  const ext = extname(file.originalname);
  if (ext === ".json") {
    cb(null, true);
  } else {
    cb(new Error("Only JSON files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
