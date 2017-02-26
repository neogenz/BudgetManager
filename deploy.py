# Examples of usage
# python deploy.py -e development
# python deploy.py --environment dev


from shutil import copyfile
import sys, getopt

def main(argv):
    environment = ''
    try:
        opts, args = getopt.getopt(argv, "he:", ["environment="])
    except getopt.GetoptError:
        print 'deploy.py -e <environment>'
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print 'deploy.py -e <environment>'
            sys.exit()
        elif opt in ("-e", "--environment"):
            environment = arg
    if environment == 'production':
        copyfile('./server.prod.js', './server.js');
        print 'Done.'
    if environment == 'prod':
        copyfile('./server.prod.js', './server.js');
        print 'Done.'
    elif environment == 'development':
        copyfile('./server.dev.js', './server.js');
        print 'Done.'
    elif environment == 'dev':
        copyfile('./server.dev.js', './server.js');
        print 'Done.'
    else:
        print 'Unknow environment.'

if __name__ == "__main__":
    main(sys.argv[1:])