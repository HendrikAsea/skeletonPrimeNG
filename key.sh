# Check if you have existing SSH keys
ls -la ~/.ssh

# If you don't have id_ed25519.pub or id_rsa.pub, generate a new key:
ssh-keygen -t ed25519 -C "hendrik@asea-tech.com"

# Start the ssh-agent
eval "$(ssh-agent -s)"

# Add your SSH key to the agent
ssh-add ~/.ssh/id_ed25519

# Copy your public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub