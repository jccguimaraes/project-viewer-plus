# Configuration

### Menu

Please pay attention to each individual action, specially if you are used to `project-viewer` package.

Each Atom instance has it's own state which is serialized and deserialized (keeps it's state) upon restart. This means the state from each instance is unique to itself.

When no state exists for that instance, it reads from the file defined [here](#database).

If this file does not exist, it will try to read from the legacy one (`project-viewer` package).

Ultimatly it will create a clean state.

#### State - clear

Clears the current state from the active Atom instance. This may help if the state gets corrupted for some reason.

#### File - save

Saves the current state from the active Atom instance into the file.

This does not change the other Atom instance's state. Only for new instances.

#### File - edit

Opens the state file for manual editor. It does not change any Atom instance's state. You need to import if you want to update any Atom instance.

#### File - import

Reads the state stored in the file and updates the current Atom instance.

#### File - import legacy

Reads the state stored in the legacy file (`project-viewer` package) and updates the current Atom instance.

### Database<a name="database"></a>

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
