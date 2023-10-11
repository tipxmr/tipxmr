{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [ bashInteractive ];
  buildInputs = with pkgs; [
    nodejs-18_x
    nodePackages.prisma
    prisma-engines
    nodePackages.yarn
  ];
  shellHook = with pkgs; ''
    export BROWSER=none
    export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
    export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
    export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
  '';
}
