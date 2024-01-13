import { resolve as _resolve } from 'path';

export const entry = './src/index.js';
export const output = {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'dist'), // Diretório de saída
};
export const resolve = {
    fallback: {
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify')
    }
};
export const module = {
    rules: [
        // Regras para processar diferentes tipos de arquivos
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
    ],
};
