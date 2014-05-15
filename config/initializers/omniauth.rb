OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '1424583664473344', '55862d58fdf8ad5fae02a1b76825b1ed'
end