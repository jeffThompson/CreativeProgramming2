RUNNING AN AWS INSTANCE
====

### SIGN UP FOR AN ACCOUNT  
Even if you have a regular Amazon account, you'll need to create a new one here.

1. Go to [aws.amazon.com](https://aws.amazon.com) and click the `Create a new AWS account` button.  
2. Sign up for an account with your info – select a `Professional` account and enter the contact info for Stevens. Click `Create account and continue`.  
3. You'll have to enter a credit card, but we'll be using the *free tier* it and won't cost you anything to experiment. You may also have to receive a phone call to verify your card.  
4. Once all set, select the `Basic Plan` (the free option).  
5. All done! Click the `Sign into console` button and sign in.  

### LAUNCHING AN INSTANCE  
The console can be **really** confusing, and has a ton of options and services, but we'll be using the `EC2 Compute` service only in this demo.

1. Click the `Services` button at the top-left, a drop-down with tons of options should appear.  
2. Under the first section `Compute` click `EC2`.  
3. You'll get another crazy-looking set of options – look halfway down for a button that says `Launch Instance`.  
4. Here you'll see all the different kinds of machines you can run – pretty crazy! Click the `Free tier only` checkbox on the left to see what ones you can run without paying. You can run Amazon's own version of the Linux OS or Ubuntu Server (good options), or Windows (no thanks, though may be required for things like rendering animation).  
5. Scroll all the way down and select `Ubuntu Server 14.04 LTS` (LTS = long term service, a version that is well-supported by Ubuntu).  
6. More options: here you'll see lots of different computer specs to choose from. Only one is available for the free tier: the `t2.micro` machine with 1 CPU, 1GB RAM, and slower network connection. You can go as crazy as almost 2000GB RAM, which is actually useful and sometimes necessary for machine learning projects!  
7. Make sure the `t2.micro` one is selected and click `Review and Launch`.  
8. The next page of settings aren't necessary for our basic tests – just scroll down and click `Launch`.  

**This next step is super important!** Failing to do this, or note the results, will mean you can't log into your instance.

9. A popup will ask you to create an `SSH key pair` – this is basically a fancy password that allows you to remotely log into the AWS instance in your terminal. Choose `Create new key pair` (unless you have one already) and give it a name so you can find it later.  
10. Click `Download Key Pair` and save the `.pem` file to your computer.  
11. Once all done, click the `Launch Instance` button – you'll see a screen telling you that it's launching and will be ready soon.  

###


