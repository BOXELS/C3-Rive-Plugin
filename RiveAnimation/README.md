# Rive Animation Plugin for Construct 3

A plugin that enables Rive animations to be used in Construct 3 projects.

## Current Status

This plugin is currently in development and facing some initialization issues in the editor.

### Current Issues

1. Editor Instance Initialization Error:
```
Error: unexpected type @ TypeError: unexpected type at Q.i
```
The error occurs when trying to create a new instance of the plugin in the Construct 3 editor.

## Project Structure

- `addon.js` - Main plugin code for the editor
- `c3runtime/runtime.js` - Runtime implementation
- `type.json` - Plugin type definition
- `aces.json` - Actions, conditions, and expressions
- `lang/en-US.json` - Language strings

## How to Help

If you're familiar with Construct 3 plugin development, we need help with:

1. Fixing the instance initialization error in the editor
2. Properly implementing the world instance functionality
3. Implementing Rive animation loading and playback

### Development Setup

1. Clone this repository
2. Create a new folder in your Construct plugins directory
3. Copy the files into the plugin folder
4. Restart Construct 3
5. The plugin should appear in the "Add New Object" dialog under "Other"

### Testing

To test changes:
1. Make your modifications
2. Zip the contents into a .c3addon file
3. Remove the existing plugin from Construct 3
4. Install the new .c3addon file
5. Test by adding the object to a layout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Your chosen license]

## Contact

[Your contact information if you want to provide it] 