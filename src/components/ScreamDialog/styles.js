import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    ruler: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 35
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    detailsButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    visibleRuler: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    }
});
