class ProductController {
    constructor(productModel) {
        this.productModel = productModel;
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const newProduct = await this.productModel.create(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productModel.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productModel.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const [updated] = await this.productModel.update(productData, {
                where: { id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const updatedProduct = await this.productModel.findByPk(id);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.productModel.destroy({
                where: { id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}

module.exports = ProductController;