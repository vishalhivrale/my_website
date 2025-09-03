from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os
from datetime import timedelta

app = Flask(__name__)
app.secret_key = "puppy_secret_key"
app.permanent_session_lifetime = timedelta(days=7)

USERS_FILE = "users.json"


def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)


def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session.permanent = "remember" in request.form
        username = request.form["username"]
        password = request.form["password"]
        users = load_users()
        if username in users and users[username] == password:
            session["user"] = username
            return jsonify({"success": True})
        else:
            return jsonify({"success": False})
    if "user" in session:
        return redirect(url_for("index"))
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        confirm = request.form["confirm"]
        users = load_users()
        if username in users:
            return jsonify({"success": False, "error": "exists"})
        if password != confirm:
            return jsonify({"success": False, "error": "mismatch"})
        users[username] = password
        save_users(users)
        return jsonify({"success": True})
    return render_template("signup.html")


@app.route("/index")
def index():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("index.html", username=session["user"])


@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

