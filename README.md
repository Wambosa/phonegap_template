# phonegap_template
An easy starting point for phonegap development. Albeit an older version.

The config.xml drives **most** of the app configuration.
I have hardcoded version **5.2.0**

``` xml
<preference name="phonegap-version" value="cli-5.2.0" />
```

## Testing App Quickly
1. ```npm install phonegap -g```
2. use **CLI** navigate to app directory (where ```config.xml``` resides)
3. ```phonegap serve --no-browser```
4. use chrome browser to navigate to the default localhost:3000
5. open up a the dev tools ```F12``` (_undock_ window pane for sanity)
6. Toggle _device toolbar_ (in the top left corner of dev tools. looks like a phone and a tablet icon)


## Building App to Device
- App can be built using [Adobe Build Servers](https://build.phonegap.com/apps)
- if using apple, you must create a provisioning profile (many steps involved with $100 cost)
- if using android, only requirement is turning on dev mode in phone/tablet settings

### future
- elaborate on provisioning profile instructions
- explain how to make a legit signed apk or ipa
- potentially include file access code examples
- potentially include network code examples
- potentially include camera access examples