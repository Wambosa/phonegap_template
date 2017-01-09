# phonegap_template
An easy starting point tutorial for phonegap development.

The config.xml drives **most** of the app configuration.
Phonegap CLI stable version **6.3.0** is used

``` xml
<preference name="phonegap-version" value="cli-6.3.0" />
```

# Creating an App
_You are mostly on your own here_  
Common tools such as **HTML CSS and Javascript** can be used in conjunction with existing cordova/phonegap plugins to create an app.  
Keep the size light and code fast, since it can be run on various devices with older js specs and older browsers that may even be deprecated.  
This is called a **Hybrid web app**

# Testing App Quickly
1. ```npm install phonegap -g```
2. use **CLI** navigate to app directory (where ```config.xml``` resides)
3. ```phonegap serve --no-browser```
4. use chrome browser to navigate to the default http://localhost:3000
5. open up a the dev tools ```F12``` (_undock_ window pane for sanity)
6. Toggle _device toolbar_ (in the top left corner of dev tools. looks like a phone and a tablet icon)
 - ![](http://shondiaz.com/host/dev-tool-icon.png)
7. from this point; the power of chrome dev tools can be used to debug and build applications fast

# Deploy App to Device
- App can be built using [Adobe Build Servers](https://build.phonegap.com/apps)
- It is best to connect a github/bitbucket repository link to the adobe build account; 
 - in this way automated/fast cross platform builds become possible
 - you can pull code directly from the repository and begin the build process simultaneously for ios and android
- if building for apple, you must create a **provisioning profile** (many steps involved with a required $100 cost)
- if building for android, only requirement is turning on **dev mode in phone/tablet settings**

## Apple Signing
_certificates expire every year, so this process has to be repeated. It is possible to do this without a mac.
The steps below can be done on any machine with **openssl**_

### Step one
- sign up apple developer program (it cost _$100 a year_ and there is no legal way around it)
- sign in [here](https://developer.apple.com/account/)
- select **Certificates, Identifiers & Profiles**
- select **Certificates** on the left (if not already selected)
- select the inconspicuous **+** button near the top right corner of the screen beneath your account name and magnifying glass.
- scroll down to the bottom and click on the link beneath _Intermediate Certificates_ that says **Worldwide Developer Relations Certificate Authority**
 - this will trigger a download of a file similar to **AppleWWDRCA.cer**
 
### Step two
- spin up a CLI environment that has openssl
 - windows: [gitbash](https://git-for-windows.github.io/) will have all the tools you need to complete the following steps
 - ubuntu: should already have openssl! else ```apt-get install openssl```
 - mac: should be installed (prove with ```which openssl```)
- ```openssl genrsa -out private.key 2048```
 - where **private.key** is the name of the newly generated private key file
- nix: ```openssl req -new -key private.key -out CertificateSigningRequest.certSigningRequest -subj '/emailAddress=myEmail@email.com, CN=myFirst myLast, C=US'```
- win: ```openssl req -new -key private.key -out CertificateSigningRequest.certSigningRequest -subj '//emailAddress=myEmail@email.com, CN=myFirst myLast, C=US'```
 - where **private.key** is the name of the file created on the previous command
 - where **CertificateSigningRequest.certSigningRequest** is the name of the newly generated signing request
 - where **myEmail@email.com** is your real email address
 - where **myFirst myLast** is your real name
 - where **US** is your country

### Step three
- return to the developer portal; on the page where you retrieved **AppleWWDRCA.cer** (follow step one to get there)
- instead of downloading the .cer file again, you will select **iOS App Development** near the top of the list
 - An explanation of what is needed will be given to you; click next/continue
- choose the **CertificateSigningRequest.certSigningRequest** file that was generated on the previous command
- you will be given a new **ios_development.cer** file for your efforts

### Step four
- ```openssl x509 -in ios_development.cer -inform DER -out ios_development.pem -outform PEM```
- ```openssl pkcs12 -export -inkey private.key -in ios_development.pem -out ios_development.p12```
 - windows: prefix with **winpty** openssl (or else you may never get the password prompt)
 - you should be prompted for a password. do not forget it.
- congratulations! you now have a usable development .p12

### Step five
- nix: ```openssl req -new -key private.key -out DistCertificateSigningRequest.certSigningRequest  -subj '/emailAddress=myEmail@email.com, CN=myFirst myLast, C=US'```
- win: ```openssl req -new -key private.key -out DistCertificateSigningRequest.certSigningRequest  -subj '//emailAddress=myEmail@email.com, CN=myFirst myLast, C=US'```

### Step six
- return to the developer portal; on the page where you retrieved **AppleWWDRCA.cer** (follow step one to get there)
- instead of downloading the .cer file again, you will select **App Store and Ad Hoc** beneath _Production_ section
 - An explanation of what is needed will be given to you; click next/continue
- choose the **DistCertificateSigningRequest.certSigningRequest** file that was generated on the previous command
- this quest rewards you with **ios_distribution.cer**

### Step seven
- ```openssl x509 -in ios_distribution.cer -inform DER -out ios_distribution.pem -outform PEM```
- ```openssl pkcs12 -export -inkey private.key -in ios_distribution.pem -out ios_distribution.p12```
 - windows: prefix with **winpty** openssl (or else you may never get the password prompt)
 - you should be prompted for a password. lose this, and you have to do this all over again.
- congratulations! you now have a usable production .p12

### Step eight
- sign in [here](https://developer.apple.com/account/)
- select **Devices** (on the left)
- select the inconspicuous **+** button near the top right corner of the screen beneath your account name and magnifying glass.
 - the UDID is a unique id assigned to each device. It can be obtained by plugging a device into iTunes
 - **or** by usb on ubuntu $ ```lsusb -v 2>/dev/null | grep -e "Apple Inc" -A 2``` (iSerial is the real UDID)
- repeat for **n** devices you plan to test with

### Step nine
- select **Identifiers App IDs** (on the left)
- select the inconspicuous **+** button near the top right corner of the screen beneath your account name and magnifying glass.
- select **Wildcard App ID** (trust me, you do not want to get into the business of managing a ton of bundle names)
 - Bundle ID:  com.myCompanyName.*

### Step ten
- select **Provisioning Profiles** (on the left)
- select the inconspicuous **+** button near the top right corner of the screen beneath your account name and magnifying glass.
- Select **iOS App Development**
 - Select your **bundle identifier** (com.my.*) created in _Step nine_
 - Select the development p12 you just uploaded (should be the only option)
 - Select all the devices you added in Step eight
 - name your provision configuration well...
 - download
- celebrate with wine; for you have the .mobileprovision needed for real dev testing
- repeat this step for the production .mobileprovision as well

### Step eleven
- login to [abobe build settings](https://build.phonegap.com/people/edit)
- select **add key**
- upload your corresponding development .p12 and .mobileprovision
- upload your corresponding production .p12 and .mobileprovision
- see you next year! (cause it expires in a year)
 

### future
- elaborate on provisioning profile instructions
- explain how to make a legit signed apk or ipa
- potentially include file access code examples
- potentially include network code examples
- potentially include camera access examples