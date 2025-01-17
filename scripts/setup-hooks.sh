#!/bin/bash
# Install Talisman
curl --silent https://raw.githubusercontent.com/thoughtworks/talisman/master/global_install_scripts/install.bash > install.bash
chmod +x install.bash
./install.bash

# Install pre-commit
pip install pre-commit
pre-commit install

echo "Security hooks installed successfully!"
echo "Note: Pre-commit hooks are now active. Do not use --no-verify with git commit unless absolutely necessary."