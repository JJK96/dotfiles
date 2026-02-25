from myneo4j import get_active_users, get_active_users_with_email


def get_username_password(filename, domain):
    with open(filename) as f:
        for line in f.readlines():
            line = line[:-1]
            username, hash, password = line.split(":")
            try:
                i = username.index("\\")
                username = username[i+1:]
            except ValueError:
                pass
            key = f"{username}@{domain}".upper()
            yield key, username, password


def get_csv_with_email(filename, domain):
    active_users = {}
    for email, name in get_active_users_with_email():
        active_users[name] = email
    for key, username, password in get_username_password(filename, domain):
        email = active_users.get(key)
        if not email:
            continue
        print(":".join([username, email, password]))


def get_csv(filename, domain):
    active_users = set(get_active_users())
    for key, username, password in get_username_password(filename, domain):
        if key in active_users:
            print(":".join([username, password]))


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("filename")
    parser.add_argument("domain")
    parser.add_argument("-e", "--with-email", action="store_true")
    args = parser.parse_args()
    if args.with_email:
        get_csv_with_email(args.filename, args.domain)
    else:
        get_csv(args.filename, args.domain)
