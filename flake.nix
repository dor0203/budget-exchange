{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        initializeDatabase = ''
          export PGDATA="$(pwd)/.pgdata"
          export PGHOST="$PGDATA"
          if [ ! -d "$PGDATA" ]; then
            initdb --pgdata=$PGDATA -c "unix_socket_directories=$PGDATA" > /dev/null
          fi

          alias psql="psql --host=$PGDATA"
          pg_ctl --pgdata=$PGDATA -l "$PGDATA/logfile" start
          trap "pg_ctl -D \"$PGDATA\" stop" EXIT
        '';

      in with pkgs; {
        devShells.default = mkShell {
          buildInputs = [
            nodejs
            yarn
            typescript-language-server
            vscode-json-languageserver
            marksman
            nil
            postgresql
          ];

          shellHook = ''
            yarn install
            "$EDITOR"
            ${initializeDatabase}
          '';
        };
      });
}
