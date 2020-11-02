import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    invisibleRuler: {
        border: 'none',
        margin: 4
    },
    visibleRuler: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },
    image: {
        maxWidth: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
});
