from flask.ext.script import Manager, Shell, Server
from src import app

manager = Manager(app)
manager.add_command("runserver", Server(use_debugger=True, threaded=True))
manager.add_command("shell", Shell())
@manager.command
def createdb():
    from src import db
    db.create_all()
manager.run()
