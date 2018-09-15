# Configuration

### Database

Settings | Type | Default | Description
---------|------|---------|------------
`path` | `string` | `process.env.ATOM_HOME` | If set to any local path, it will override the default path `ex: ~/.atom`.

### Dock

Settings | Type | Default | Description
---------|------|---------|------------
`position` | `string` | `Right` | In which dock to position `project-viewer-plus`.
`isVisible` | `boolean` | `false` | If set to `true`, it will show the <em>dock</em> where `project-viewer-plus` is placed.
`isActive` | `boolean` | `false` | If set to `true`, it will make `project-viewer-plus` the visible <em>item</em> in the placed <em>dock</em>.
`saveChanges` | `boolean` | `false` | If set to `true`, it will save all changes related to the position and visibility of the `project-viewer-plus`\'s <em>item</em> in the placed <em>dock</em>.

### Packages

Settings | Type | Default | Description
---------|------|---------|------------
`treeView` | `boolean` | `false` | Tick to disable messing with `tree-view` package.
`findAndReplace` | `boolean` | `false` | Tick to disable messing with `find-and-replace` package.
`statusBar` | `boolean` | `false` | Tick to disable messing with `status-bar` package.
`linter` | `boolean` | `false` | Tick to disable messing with `linter` and `linter-ui-default` packages.
`github` | `boolean` | `false` | Tick to disable messing with `github` package.

### Database File

```json
// project-viewer-plus.json
{
  "groups": [
    {
      "name": "project-name",
      "icon": "default-icon",
      "sortBy": "position",
      "groups": [
        {
          "name": "project-name",
          "icon": "default-icon",
          "sortBy": "alphabetically",
          "groups": [],
          "projects": []
        }
      ],
      "projects": []
    }
  ],
  "projects": [
    {
      "name": "project-name",
      "icon": "default-icon",
      "paths": [
        "/path/to/project"
      ]
    }
  ]
}
```

### Others

- You can define for how long a notification stays in the screen: `Settings -> packages -> notifications`.
