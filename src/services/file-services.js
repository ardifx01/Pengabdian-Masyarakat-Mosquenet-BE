import path from 'path';
import fs from 'fs/promises';

const deleteFile = async (filename) => {
  try {
    const absolutePath = path.join(process.cwd(), filename);
    await fs.unlink(absolutePath);
    return {
      status: 200,
      message: "Berhasil menghapus file"
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Gagal menghapus file"
    };
  }
}

export default {
  deleteFile
}