# Cross compiling for windows

https://github.com/rust-lang/rust/issues/48272#issuecomment-429596397

Error `00~undefined reference to ``_Unwind_RaiseException'01~`: 

```toml
[profile.release]
panic = "abort"
```
