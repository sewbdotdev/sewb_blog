import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function remarkPluginForKeyTakeaway() {
    return (tree: any) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
            ) {
                if (node.name !== 'note') return;
                const data = node.data || (node.data = {});
                const tagName = node.type === 'textDirective' ? 'span' : 'div';

                data.hName = tagName;
                data.hProperties = h(tagName, node.attributes).properties;
                console.log(data);
            }
        });
    };
}

export default remarkPluginForKeyTakeaway;
