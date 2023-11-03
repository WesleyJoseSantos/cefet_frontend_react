import { Button, Box } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const MenuComp = ({ setActiveScreen, activeScreen }) => {
    MenuComp.propTypes = {
        setActiveScreen: PropTypes.any,
        activeScreen: PropTypes.func,
    };
    return (
        <Box display="flex" justifyContent="space-between">
            <Button
                colorScheme={activeScreen === "current" ? "blue" : "gray"}
                onClick={() => setActiveScreen("current")}
            >
                Tela Atual
            </Button>
            <Button
                colorScheme={activeScreen === "novaTela" ? "blue" : "gray"}
                onClick={() => setActiveScreen("novaTela")}
            >
                Nova Tela
            </Button>
        </Box>
    );
};

export default MenuComp;
