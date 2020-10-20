import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://${process.env.LOCALHOST_NUMBER}/uploads/${image.path}`
        }
    },
    
    rendeMany(img: Image[]) {
        return img.map(img => this.render(img))
    }
}