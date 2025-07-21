# TaskPro

## Setting Up SSL (HTTPS)

To enable SSL for local development, run the following script:

```bash
bash certs/setup_ssl.sh
```

This will generate self-signed SSL certificates under the `certs/` directory.

### Optional: Trust the Certificate

To avoid browser warnings and enable full HTTPS support, you can add the generated certificate to your operating system’s trusted certificate store:

- **macOS**:  
  Open **Keychain Access**, drag the `.crt` file into the **System** keychain, then double-click it and set it to **"Always Trust"**.

- **Linux**:  
  Copy the `.crt` file to `/usr/local/share/ca-certificates/` and run:

  ```bash
  sudo update-ca-certificates
  ```

- **Windows**:  
  Open **"Manage Computer Certificates"**, navigate to **"Trusted Root Certification Authorities"**, and import the `.crt` file.
