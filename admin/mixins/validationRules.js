export default {
    data() {
      return {
        rules: {
          password: [
            val => (val || "").length > 0 || "Password needs to be filled"
          ],

          select(value) {
            return val =>  val.length > 0 || `${value} needs to be selected`
          },
  
          textField(inputField) {
            return value => !!value || `${inputField} needs to be filled`
          },
  
          avatarRules: [v => !!v || "File is required"],
          
          email: [
            v => !!v || "E-mail không được để trống",
            v => /.+@.+\..+/.test(v) || "E-mail phải đúng định dạng"
          ],
  
          confirm(password) {
            return v => v === password || `Xác nhận mật khẩu không khớp`;
          }
        }
      };
    }
  };
  