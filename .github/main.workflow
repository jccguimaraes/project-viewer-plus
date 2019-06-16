action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
}
