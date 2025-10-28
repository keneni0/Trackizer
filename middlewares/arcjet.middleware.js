import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req , {requested : 1 });

        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){ return res.status(429).json({ error: 'Rate limit exceeded' });
            }
            if(decision.reason.isBlocked()){ return res.status(403).json({ error: 'Access denied' });
            }
            if(decision.reason.isBot()){ return res.status(403).json({ error: 'Bot detected' });
            }
            if(decision.reason.isMalicious()){ return res.status(403).json({ error: 'Malicious activity detected' });
            }
            if(decision.reason.isSuspicious()){ return res.status(403).json({ error: 'Suspicious activity detected' });
            }
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    }catch(error){
        next(error);
    }
};

export default arcjetMiddleware;