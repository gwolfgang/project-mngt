const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf-8');

const oldStart = `              return (
                <motion.div
                  key={node.id}
                  drag
                  dragElastic={0.05}
                  onDragStart={() => setDraggingId(node.id)}
                  onDragEnd={(_, info) => {
                    onDragEnd(info, node.id);
                    setDraggingId(null);
                  }}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.01, zIndex: 40 }}
                  className="absolute left-[50%] z-20 w-[min(560px,calc(100%-190px))] -translate-x-1/2 px-2"
                  style={{ top, x: node.x }}
                >
                  <button`;

const newStart = `              return (
                <div 
                  key={node.id} 
                  className="absolute left-[50%] z-20 w-[min(560px,calc(100%-190px))] -translate-x-1/2 px-2 pointer-events-none" 
                  style={{ top }}
                >
                  <motion.div
                    drag
                    dragElastic={0.05}
                    onDragStart={() => setDraggingId(node.id)}
                    onDragEnd={(_, info) => {
                      onDragEnd(info, node.id);
                      setDraggingId(null);
                    }}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.01, zIndex: 40 }}
                    className="pointer-events-auto"
                    style={{ x: node.x }}
                  >
                    <button`;

const oldEnd = `                      </div>
                    </button>
                  </motion.div>
              );`;

const newEnd = `                      </div>
                    </button>
                  </motion.div>
                </div>
              );`;

if (c.includes(oldStart)) {
  c = c.replace(oldStart, newStart);
  c = c.replace(oldEnd, newEnd);
  fs.writeFileSync('src/App.jsx', c);
  console.log('Successfully wrapped node in div');
} else {
  console.log('Could not find target content');
}
