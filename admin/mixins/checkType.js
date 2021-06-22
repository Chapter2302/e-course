export default {
    methods: {
      getExtension,
      isImage,
      isVideo,
      isPdf
    }
  };
  
  function getExtension(filename) {
    const parts = filename.split(".");
    return parts[parts.length - 1];
  }
  
  export function isImage(filename) {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
      case "ico":
      case "webp":
      case "svg":
      case "jpeg":
        //etc
        return true;
    }
    return false;
  }
  
  export function isVideo(filename) {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "ogg":
      case "webm":
      case "mp4":
        // etc
        return true;
    }
    return false;
  }
  
  export function isPdf(fileName) {
    const ext = this.getExtension(fileName);
    return ext === "pdf";
  }