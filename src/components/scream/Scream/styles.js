import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        borderRadius: '10px',
        boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 0.2)'
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
});
