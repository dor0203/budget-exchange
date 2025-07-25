{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        node-modules = pkgs.mkYarnPackage {
          name = "node-modules";
          src = ./.;
          packageJSON = ./package.json;
          yarnLock = ./yarn.lock;
        };
      in with pkgs; {
        devShells.default = mkShell {
          buildInputs = [
            nodejs
            yarn
            node-modules
            typescript-language-server
            vscode-json-languageserver
            marksman
            nil
          ];

          shellHook = ''
            export NODE_PATH=${node-modules}/lib/node_modules
            export PATH=${node-modules}/bin:$PATH
          '';
        };
      });
}
