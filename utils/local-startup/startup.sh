sls offline start \
    --host 0.0.0.0 \
    --param='QUEUE_STAGE_NAME=local' \
    --param='ALGORITHMS_API_URI=http://0.0.0.0:5001/dev-pr/' \
    --param="FIREBASE_ADMIN_CREDS=$FIREBASE_ADMIN_CREDS"